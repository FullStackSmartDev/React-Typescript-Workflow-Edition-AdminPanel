export const getFormularyDetails = () => {
  return [
    {
      id: 1,
      key: 1,
      serviceYear: "2021",
      bazaar: {
        label: "N/A",
        type: "block",
        variant: 3,
        fill: "fill",
      },
      origin: {
        label: "Purchased",
        type: "pill",
        variant: 1,
        fill: "fill",
      },
      formularyName: "2021Care1234",
      formularyId: "123",
      version: "1",
      timeRemaining: {
        text: "09/04/2020  @ 9:00 AM",
        progress: 25,
      },
      step: "2",
    },
    {
      id: 2,
      key: 2,
      serviceYear: "2021",
      bazaar: {
        label: "SELL",
        type: "block",
        variant: 2,
        fill: "outline",
      },
      origin: {
        label: "Imported",
        type: "pill",
        variant: 2,
        fill: "fill",
      },
      formularyName: "2021Care1234",
      formularyId: "123",
      version: "1",
      timeRemaining: {
        text: "09/04/2020  @ 9:00 AM",
        progress: 65,
      },
      step: "2",
    },
    {
      id: 3,
      key: 3,
      serviceYear: "2021",
      bazaar: {
        label: "SELLING",
        type: "block",
        variant: 1,
        fill: "fill",
      },
      origin: {
        label: "Purchased",
        type: "pill",
        variant: 3,
        fill: "fill",
      },
      formularyName: "2021Care1234",
      formularyId: "123",
      version: "1",
      timeRemaining: {
        text: "09/04/2020  @ 9:00 AM",
        progress: 80,
      },
      step: "2",
    },
  ];
};

export const hierarchyDetailsGridData = () => {
  return [
    {
      id: 1,
      key: 1,
      name: "HCN EPO",
      level_id : "89239238",
      module_count : "14",
      effective_date:"01/30/2021",
      status:{
        label: "Active",
        type: "pill",
        variant: 8,
        fill: "fill",
      }
    },
    {
      id: 2,
      key: 2,
      name: "Pacific Urgent Care",
      level_id : "89239238",
      module_count : "14",
      effective_date:"01/30/2021",
      status:{
        label: "Active",
        type: "pill",
        variant: 8,
        fill: "fill",
      }
    },
    {
      id: 3,
      key: 3,
      name: "HealthCare Center",
      level_id : "89239238",
      module_count : "14",
      effective_date:"01/30/2021",
      status:{
        label: "Termed",
        type: "pill",
        variant: 3,
        fill: "fill",
      }
    },
    {
      id: 4,
      key: 4,
      name: "Kaiser Permanente",
      level_id : "89239238",
      module_count : "14",
      effective_date:"01/30/2021",
      status:{
        label: "Archived",
        type: "pill",
        variant: 9,
        fill: "fill",
      }
    },
    {
      id: 5,
      key: 5,
      name: "Rite Aid",
      level_id : "89239238",
      module_count : "14",
      effective_date:"01/30/2021",
      status:{
        label: "Active",
        type: "pill",
        variant: 8,
        fill: "fill",
      }
    },
    {
      id: 6,
      key: 6,
      name: "HCN PPO",
      level_id : "89239238",
      module_count : "14",
      effective_date:"01/30/2021",
      status:{
        label: "Active",
        type: "pill",
        variant: 8,
        fill: "fill",
      }
    },
  ];
};
