import { AssistanceProgram, EligibilityFormState, MatchConfidence, ProgramMatchResult } from '../types';

export function formatPHP(amount?: number): string {
  if (amount === undefined || amount === null) return "Varies based on assessment";
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString?: string): string {
  if (!dateString) return "Continuous / No deadline";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function generateReferenceNumber(): string {
  const random4 = Math.floor(1000 + Math.random() * 9000);
  const currentYear = new Date().getFullYear();
  return `APP-${currentYear}-${random4}`;
}

export function evaluateEligibility(
  form: EligibilityFormState,
  programs: AssistanceProgram[]
): ProgramMatchResult[] {
  const results: ProgramMatchResult[] = [];

  for (const program of programs) {
    const matchReasons: string[] = [];
    const unmetCriteria: string[] = [];
    let score = 50; // base score

    // 1. Check Income
    const incomeNum = Number(form.monthlyIncome);
    if (!isNaN(incomeNum) && incomeNum > 0) {
      if (incomeNum <= program.eligibilityRules.maxMonthlyIncome) {
        matchReasons.push(`Household income (₱${incomeNum.toLocaleString()}/mo) is within program limit (max ₱${program.eligibilityRules.maxMonthlyIncome.toLocaleString()}/mo).`);
        score += 25;
      } else {
        unmetCriteria.push(`Monthly income (₱${incomeNum.toLocaleString()}) exceeds the program cap (₱${program.eligibilityRules.maxMonthlyIncome.toLocaleString()}).`);
        score -= 30;
      }
    }

    // 2. Check Expense Category / Medical Condition Match
    if (form.expenseCategories && form.expenseCategories.length > 0) {
      const categoryOverlap = form.expenseCategories.filter(cat => program.category.includes(cat));
      if (categoryOverlap.length > 0) {
        const formattedCats = categoryOverlap.map(c => c.replace('_', ' ')).join(', ');
        matchReasons.push(`Covers your requested expense categories (${formattedCats}).`);
        score += 20;
      } else {
        unmetCriteria.push(`Does not specifically subsidize the selected expense category.`);
        score -= 20;
      }
    }

    // 3. Check Indigency
    if (program.eligibilityRules.requiresIndigency) {
      if (form.hasBarangayIndigency) {
        matchReasons.push(`Barangay Certificate of Indigency satisfies public indigency criteria.`);
        score += 15;
      } else if (incomeNum <= 15000) {
        matchReasons.push(`Household income qualifies for expedited social classification.`);
        score += 10;
      }
    } else {
      matchReasons.push(`Universal access: Barangay indigency certificate is not strictly mandatory.`);
      score += 10;
    }

    // 4. Check Insurance Status
    if (form.insuranceStatus) {
      if (program.assistanceType === 'insurance_benefit' && form.insuranceStatus !== 'philhealth') {
        unmetCriteria.push(`Requires active PhilHealth membership for benefit claims.`);
        score -= 25;
      } else if (form.insuranceStatus === 'philhealth') {
        matchReasons.push(`Active PhilHealth coverage enables combined subsidy and co-payment relief.`);
        score += 10;
      }
    }

    // 5. Check Availability status
    if (program.availability === 'available') {
      score += 10;
    } else if (program.availability === 'limited') {
      score += 0;
    } else if (program.availability === 'currently_unavailable' || program.availability === 'not_offered') {
      score -= 30;
      unmetCriteria.push(`Program is currently paused or quota reached.`);
    }

    // Determine Confidence
    score = Math.max(0, Math.min(100, score));
    let confidence: MatchConfidence = "potential";
    if (score >= 75) {
      confidence = "high";
    } else if (score < 45 || unmetCriteria.length >= 2) {
      confidence = "not_met";
    }

    results.push({
      program,
      confidence,
      matchScore: score,
      matchReasons,
      unmetCriteria,
    });
  }

  // Sort: high match first, then score descending
  return results.sort((a, b) => b.matchScore - a.matchScore);
}
