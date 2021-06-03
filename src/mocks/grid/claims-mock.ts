export const getClaimsGridData = () => {
  return [
    {
      id: 1,
      key: 1,
      claimId: "MED12334456787",
      testClaimId: "MED12334456787",
      serviceDate: "06/22/2020",
      status: "Paid",
      type: "Medicare",
      memberName: "Jack Davis",
      memberId: "M11111",
      mbi: "11111",
      drugLabel: "Abilify 10mg",
      qty: 30,
      daysSupply: 30,
      rejectionCode: 75,
      rejectionDescription: "Prior Authorization Needed",
      prescriber: "Fred Smith",
      pharmacy: "Walmart",
      memberInTransition: "Yes",
      transitionClaim: "Yes",
      scheduledDrug: 2,
      rx: "243557178",
      drugTier: 2,
      drugCategory: "Analgesics",
      drugClass: "Opioid: Analgesics",
      mme: "200 Mg",
      costShare: 53.0,
      process: "Brand",
      pricingSource: "AWP",

      items: [
        {
          id: 11,
          key: 11,
          title: "Adjustment to Deny",
        },
        {
          id: 12,
          key: 12,
          title: "Member Adjustment",
        },
        {
          id: 13,
          key: 13,
          title: "Pharmacy Adjustment",
        },
        {
          id: 14,
          key: 14,
          title: "Run Test Claim",
        },
        {
          id: 30,
          key: 30,
          title: "Claim Compare",
        },
        {
          id: 15,
          key: 15,
          title: "Create Clinical PA",
        },
        {
          id: 16,
          key: 16,
          title: "Create Non-Clinical PA",
        },
      ],
    },
    {
      id: 2,
      key: 2,
      claimId: "MED32334356786",
      testClaimId: "MED32334356786",
      serviceDate: "06/22/2020",
      status: "Rejected",
      type: "Medicare",
      drugLabel: "Abilify 10mg",
      memberName: "John Murray",
      memberId: "M22222",
      mbi: "22222",
      qty: 20,
      daysSupply: 35,
      rejectionCode: 75,
      rejectionDescription: "Prior Authorization Needed",
      prescriber: "Fred Smith",
      pharmacy: "Walmart",
      memberInTransition: "Yes",
      transitionClaim: "Yes",
      scheduledDrug: 2,
      rx: "243557178",
      drugTier: 2,
      drugCategory: "Analgesics",
      drugClass: "Opioid: Analgesics",
      mme: "200 Mg",
      costShare: 53.0,
      process: "Brand",
      pricingSource: "AWP",
      items: [
        {
          id: 17,
          key: 17,
          title: "Run Test Claim",
        },
        {
          id: 30,
          key: 30,
          title: "Claim Compare",
        },
        {
          id: 18,
          key: 18,
          title: "Create Clinical PA",
        },
        {
          id: 19,
          key: 19,
          title: "Create Non-Clinical PA",
        },
      ],
    },
    {
      id: 3,
      key: 3,
      claimId: "COM22354456788",
      testClaimId: "COM22354456788",
      serviceDate: "06/22/2020",
      status: "Paid",
      type: "Commercial",
      memberName: "Julia McDonald",
      memberId: "M33333",
      mbi: "33333",
      drugLabel: "Abilify 10mg",
      qty: 50,
      daysSupply: 25,
      rejectionCode: 75,
      rejectionDescription: "Prior Authorization Needed",
      prescriber: "Fred Smith",
      pharmacy: "Walmart",
      memberInTransition: "Yes",
      transitionClaim: "Yes",
      scheduledDrug: 2,
      rx: "243557178",
      drugTier: 2,
      drugCategory: "Analgesics",
      drugClass: "Opioid: Analgesics",
      mme: "200 Mg",
      costShare: 53.0,
      process: "Brand",
      pricingSource: "AWP",
      items: [
        {
          id: 20,
          key: 20,
          title: "Run Test Claim",
        },
        {
          id: 30,
          key: 30,
          title: "Claim Compare",
        },
        {
          id: 21,
          key: 21,
          title: "Create Clinical PA",
        },
        {
          id: 22,
          key: 22,
          title: "Create Non-Clinical PA",
        },
      ],
    },
    {
      id: 4,
      key: 4,
      claimId: "COM12334456787",
      testClaimId: "COM12334456787",
      serviceDate: "06/22/2020",
      type: "Commercial",
      status: "Rejected",
      drugLabel: "Abilify 10mg",
      qty: 30,
      memberName: "Debra Messing",
      memberId: "M44444",
      mbi: "44444",
      daysSupply: 60,
      rejectionCode: 75,
      rejectionDescription: "Prior Authorization Needed",
      prescriber: "Fred Smith",
      pharmacy: "Walmart",
      memberInTransition: "Yes",
      transitionClaim: "Yes",
      scheduledDrug: 2,
      rx: "243557178",
      drugTier: 2,
      drugCategory: "Analgesics",
      drugClass: "Opioid: Analgesics",
      mme: "200 Mg",
      costShare: 53.0,
      process: "Brand",
      pricingSource: "AWP",
      items: [
        {
          id: 23,
          key: 23,
          title: "Adjustment to Deny",
        },
        {
          id: 24,
          key: 24,
          title: "Member Adjustment",
        },
        {
          id: 25,
          key: 25,
          title: "Pharmacy Adjustment",
        },
        {
          id: 26,
          key: 26,
          title: "Run Test Claim",
        },
        {
          id: 30,
          key: 30,
          title: "Claim Compare",
        },
        {
          id: 27,
          key: 27,
          title: "Create Clinical PA",
        },
        {
          id: 28,
          key: 28,
          title: "Create Non-Clinical PA",
        },
      ],
    },
    {
      id: 5,
      key: 5,
      claimId: "COM12334456787",
      testClaimId: "COM12334456787",
      serviceDate: "06/22/2020",
      status: "Reversed",
      type: "Commercial",
      memberName: "Robert Dewey",
      memberId: "M55555",
      mbi: "55555",
      drugLabel: "Abilify 10mg",
      qty: 30,
      daysSupply: 60,
      rejectionCode: 75,
      rejectionDescription: "Prior Authorization Needed",
      prescriber: "Fred Smith",
      pharmacy: "Walmart",
      memberInTransition: "Yes",
      transitionClaim: "Yes",
      scheduledDrug: 2,
      rx: "243557178",
      drugTier: 2,
      drugCategory: "Analgesics",
      drugClass: "Opioid: Analgesics",
      mme: "200 Mg",
      costShare: 53.0,
      process: "Brand",
      pricingSource: "AWP",
      items: [
        {
          id: 29,
          key: 29,
          title: "Adjustment to Deny",
        },
        {
          id: 30,
          key: 30,
          title: "Member Adjustment",
        },
        {
          id: 31,
          key: 31,
          title: "Pharmacy Adjustment",
        },
        {
          id: 32,
          key: 32,
          title: "Run Test Claim",
        },
        {
          id: 30,
          key: 30,
          title: "Claim Compare",
        },
        {
          id: 33,
          key: 33,
          title: "Create Clinical PA",
        },
        {
          id: 34,
          key: 34,
          title: "Create Non-Clinical PA",
        },
      ],
    },
    {
      id: 6,
      key: 6,
      claimId: "MED12334456787",
      testClaimId: "MED12334456787",
      serviceDate: "06/22/2020",
      type: "Medicare",
      status: "Reversed",
      drugLabel: "Abilify 10mg",
      qty: 30,
      memberName: "Robert Dewey",
      memberId: "M55555",
      mbi: "55555",
      daysSupply: 60,
      rejectionCode: 75,
      rejectionDescription: "Prior Authorization Needed",
      prescriber: "Fred Smith",
      pharmacy: "Walmart",
      memberInTransition: "Yes",
      transitionClaim: "Yes",
      scheduledDrug: 2,
      rx: "243557178",
      drugTier: 2,
      drugCategory: "Analgesics",
      drugClass: "Opioid: Analgesics",
      mme: "200 Mg",
      costShare: 53.0,
      process: "Brand",
      pricingSource: "AWP",
      items: [
        {
          id: 23,
          key: 23,
          title: "Adjustment to Deny",
        },
        {
          id: 24,
          key: 24,
          title: "Member Adjustment",
        },
        {
          id: 25,
          key: 25,
          title: "Pharmacy Adjustment",
        },
        {
          id: 26,
          key: 26,
          title: "Run Test Claim",
        },
        {
          id: 30,
          key: 30,
          title: "Claim Compare",
        },
        {
          id: 27,
          key: 27,
          title: "Create Clinical PA",
        },
        {
          id: 28,
          key: 28,
          title: "Create Non-Clinical PA",
        },
      ],
    },
    {
      id: 7,
      key: 7,
      claimId: "MED12334456788",
      testClaimId: "MED12334456788",
      serviceDate: "06/22/2020",
      type: "Medicare",
      status: "Paid",
      memberName: "Robert Dewey",
      memberId: "M55555",
      mbi: "55555",
      drugLabel: "Abilify 10mg",
      qty: 30,
      daysSupply: 60,
      rejectionCode: 75,
      rejectionDescription: "Prior Authorization Needed",
      prescriber: "Fred Smith",
      pharmacy: "Walmart",
      memberInTransition: "Yes",
      transitionClaim: "Yes",
      scheduledDrug: 2,
      rx: "243557178",
      drugTier: 2,
      drugCategory: "Analgesics",
      drugClass: "Opioid: Analgesics",
      mme: "200 Mg",
      costShare: 53.0,
      process: "Brand",
      pricingSource: "AWP",
      items: [
        {
          id: 29,
          key: 29,
          title: "Adjustment to Deny",
        },
        {
          id: 30,
          key: 30,
          title: "Member Adjustment",
        },
        {
          id: 31,
          key: 31,
          title: "Pharmacy Adjustment",
        },
        {
          id: 32,
          key: 32,
          title: "Run Test Claim",
        },
        {
          id: 30,
          key: 30,
          title: "Claim Compare",
        },
        {
          id: 33,
          key: 33,
          title: "Create Clinical PA",
        },
        {
          id: 34,
          key: 34,
          title: "Create Non-Clinical PA",
        },
      ],
    },
    {
      id: 8,
      key: 8,
      claimId: "123344567787",
      testClaimId: "123344567787",
      serviceDate: "06/22/2020",
      status: "Rejected",
      drugLabel: "Abilify 10mg",
      qty: 30,
      memberName: "Robert Dewey",
      memberId: "M55555",
      mbi: "55555",
      daysSupply: 60,
      rejectionCode: 75,
      rejectionDescription: "Prior Authorization Needed",
      prescriber: "Fred Smith",
      pharmacy: "Walmart",
      memberInTransition: "Yes",
      transitionClaim: "Yes",
      scheduledDrug: 2,
      rx: "243557178",
      drugTier: 2,
      drugCategory: "Analgesics",
      drugClass: "Opioid: Analgesics",
      mme: "200 Mg",
      costShare: 53.0,
      process: "Brand",
      pricingSource: "AWP",
      items: [
        {
          id: 23,
          key: 23,
          title: "Adjustment to Deny",
        },
        {
          id: 24,
          key: 24,
          title: "Member Adjustment",
        },
        {
          id: 25,
          key: 25,
          title: "Pharmacy Adjustment",
        },
        {
          id: 26,
          key: 26,
          title: "Run Test Claim",
        },
        {
          id: 30,
          key: 30,
          title: "Claim Compare",
        },
        {
          id: 27,
          key: 27,
          title: "Create Clinical PA",
        },
        {
          id: 28,
          key: 28,
          title: "Create Non-Clinical PA",
        },
      ],
    },
    {
      id: 9,
      key: 9,
      claimId: "123344567787",
      testClaimId: "123344567787",
      serviceDate: "06/22/2020",
      status: "Reversed",
      drugLabel: "Abilify 10mg",
      qty: 30,
      memberName: "Robert Dewey",
      memberId: "M55555",
      mbi: "55555",
      daysSupply: 60,
      rejectionCode: 75,
      rejectionDescription: "Prior Authorization Needed",
      prescriber: "Fred Smith",
      pharmacy: "Walmart",
      memberInTransition: "Yes",
      transitionClaim: "Yes",
      scheduledDrug: 2,
      rx: "243557178",
      drugTier: 2,
      drugCategory: "Analgesics",
      drugClass: "Opioid: Analgesics",
      mme: "200 Mg",
      costShare: 53.0,
      process: "Brand",
      pricingSource: "AWP",
      items: [
        {
          id: 29,
          key: 29,
          title: "Adjustment to Deny",
        },
        {
          id: 30,
          key: 30,
          title: "Member Adjustment",
        },
        {
          id: 31,
          key: 31,
          title: "Pharmacy Adjustment",
        },
        {
          id: 32,
          key: 32,
          title: "Run Test Claim",
        },
        {
          id: 30,
          key: 30,
          title: "Claim Compare",
        },
        {
          id: 33,
          key: 33,
          title: "Create Clinical PA",
        },
        {
          id: 34,
          key: 34,
          title: "Create Non-Clinical PA",
        },
      ],
    },
    {
      id: 10,
      key: 10,
      claimId: "123344567787",
      testClaimId: "123344567787",
      serviceDate: "06/22/2020",
      status: "Rejected",
      drugLabel: "Abilify 10mg",
      qty: 30,
      memberName: "Robert Dewey",
      memberId: "M55555",
      mbi: "55555",
      daysSupply: 60,
      rejectionCode: 75,
      rejectionDescription: "Prior Authorization Needed",
      prescriber: "Fred Smith",
      pharmacy: "Walmart",
      memberInTransition: "Yes",
      transitionClaim: "Yes",
      scheduledDrug: 2,
      rx: "243557178",
      drugTier: 2,
      drugCategory: "Analgesics",
      drugClass: "Opioid: Analgesics",
      mme: "200 Mg",
      costShare: 53.0,
      process: "Brand",
      pricingSource: "AWP",
      items: [
        {
          id: 23,
          key: 23,
          title: "Adjustment to Deny",
        },
        {
          id: 24,
          key: 24,
          title: "Member Adjustment",
        },
        {
          id: 25,
          key: 25,
          title: "Pharmacy Adjustment",
        },
        {
          id: 26,
          key: 26,
          title: "Run Test Claim",
        },
        {
          id: 30,
          key: 30,
          title: "Claim Compare",
        },
        {
          id: 27,
          key: 27,
          title: "Create Clinical PA",
        },
        {
          id: 28,
          key: 28,
          title: "Create Non-Clinical PA",
        },
      ],
    },
    {
      id: 11,
      key: 11,
      claimId: "123344567787",
      testClaimId: "123344567787",
      serviceDate: "06/22/2020",
      status: "Reversed",
      drugLabel: "Abilify 10mg",
      qty: 30,
      memberName: "Robert Dewey",
      memberId: "M55555",
      mbi: "55555",
      daysSupply: 60,
      rejectionCode: 75,
      rejectionDescription: "Prior Authorization Needed",
      prescriber: "Fred Smith",
      pharmacy: "Walmart",
      memberInTransition: "Yes",
      transitionClaim: "Yes",
      scheduledDrug: 2,
      rx: "243557178",
      drugTier: 2,
      drugCategory: "Analgesics",
      drugClass: "Opioid: Analgesics",
      mme: "200 Mg",
      costShare: 53.0,
      process: "Brand",
      pricingSource: "AWP",
      items: [
        {
          id: 29,
          key: 29,
          title: "Adjustment to Deny",
        },
        {
          id: 30,
          key: 30,
          title: "Member Adjustment",
        },
        {
          id: 31,
          key: 31,
          title: "Pharmacy Adjustment",
        },
        {
          id: 32,
          key: 32,
          title: "Run Test Claim",
        },
        {
          id: 30,
          key: 30,
          title: "Claim Compare",
        },
        {
          id: 33,
          key: 33,
          title: "Create Clinical PA",
        },
        {
          id: 34,
          key: 34,
          title: "Create Non-Clinical PA",
        },
      ],
    },
    {
      id: 12,
      key: 12,
      claimId: "123344567787",
      testClaimId: "123344567787",
      serviceDate: "06/22/2020",
      status: "Rejected",
      drugLabel: "Abilify 10mg",
      qty: 30,
      memberName: "Robert Dewey",
      memberId: "M55555",
      mbi: "55555",
      daysSupply: 60,
      rejectionCode: 75,
      rejectionDescription: "Prior Authorization Needed",
      prescriber: "Fred Smith",
      pharmacy: "Walmart",
      memberInTransition: "Yes",
      transitionClaim: "Yes",
      scheduledDrug: 2,
      rx: "243557178",
      drugTier: 2,
      drugCategory: "Analgesics",
      drugClass: "Opioid: Analgesics",
      mme: "200 Mg",
      costShare: 53.0,
      process: "Brand",
      pricingSource: "AWP",
      items: [
        {
          id: 23,
          key: 23,
          title: "Adjustment to Deny",
        },
        {
          id: 24,
          key: 24,
          title: "Member Adjustment",
        },
        {
          id: 25,
          key: 25,
          title: "Pharmacy Adjustment",
        },
        {
          id: 26,
          key: 26,
          title: "Run Test Claim",
        },
        {
          id: 30,
          key: 30,
          title: "Claim Compare",
        },
        {
          id: 27,
          key: 27,
          title: "Create Clinical PA",
        },
        {
          id: 28,
          key: 28,
          title: "Create Non-Clinical PA",
        },
      ],
    },
    {
      id: 13,
      key: 13,
      claimId: "123344567787",
      testClaimId: "123344567787",
      serviceDate: "06/22/2020",
      status: "Reversed",
      drugLabel: "Abilify 10mg",
      qty: 30,
      memberName: "Robert Dewey",
      memberId: "M55555",
      mbi: "55555",
      daysSupply: 60,
      rejectionCode: 75,
      rejectionDescription: "Prior Authorization Needed",
      prescriber: "Fred Smith",
      pharmacy: "Walmart",
      memberInTransition: "Yes",
      transitionClaim: "Yes",
      scheduledDrug: 2,
      rx: "243557178",
      drugTier: 2,
      drugCategory: "Analgesics",
      drugClass: "Opioid: Analgesics",
      mme: "200 Mg",
      costShare: 53.0,
      process: "Brand",
      pricingSource: "AWP",
      items: [
        {
          id: 29,
          key: 29,
          title: "Adjustment to Deny",
        },
        {
          id: 30,
          key: 30,
          title: "Member Adjustment",
        },
        {
          id: 31,
          key: 31,
          title: "Pharmacy Adjustment",
        },
        {
          id: 32,
          key: 32,
          title: "Run Test Claim",
        },
        {
          id: 30,
          key: 30,
          title: "Claim Compare",
        },
        {
          id: 33,
          key: 33,
          title: "Create Clinical PA",
        },
        {
          id: 34,
          key: 34,
          title: "Create Non-Clinical PA",
        },
      ],
    },
  ];
};
