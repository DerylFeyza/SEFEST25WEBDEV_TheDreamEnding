export interface DailyRates {
    carbon: number;
    waste: number;
  }
  
  export const getDailyEnvironmentalRates = (category: string): DailyRates => {
    switch (category.toLowerCase()) {
      case 'electronics':
        return { carbon: 0.8, waste: 0.025 };
      case 'clothing':
        return { carbon: 0.3, waste: 0.015 };
      case 'construction':
        return { carbon: 1.2, waste: 0.04 };
      case 'home':
        return { carbon: 0.5, waste: 0.02 };
      case 'sports':
        return { carbon: 0.6, waste: 0.025 };
      case 'bicycles':
        return { carbon: 1.5, waste: 0.05 }; 
      case 'cars':
        return { carbon: 2.5, waste: 0.1 };
      default:
        return { carbon: 0.4, waste: 0.01 };
    }
  };
  
  export const calculateRentalImpact = (
    start: Date,
    end: Date,
    dailyCarbon: number,
    dailyWaste: number
  ) => {
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    return {
      carbonSavings: dailyCarbon * days,
      wasteReduction: dailyWaste * days,
    };
  };