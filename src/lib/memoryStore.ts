import {
  initialHeroData,
  initialServicesData,
  initialWhyChooseData,
  initialOurWorkData,
  initialBlogsData,
  initialCareersData,
  initialTeamData,
  initialClientsData,
} from './initialData';

declare global {
  // eslint-disable-next-line no-var
  var memoryStore: {
    hero: any;
    services: any[];
    whyChoose: any[];
    ourWork: any[];
    blogs: any[];
    careers: any[];
    team: any[];
    clients: any[];
  } | undefined;
}

global.memoryStore = {
  hero: { ...initialHeroData },
  services: JSON.parse(JSON.stringify(initialServicesData)),
  whyChoose: JSON.parse(JSON.stringify(initialWhyChooseData)),
  ourWork: JSON.parse(JSON.stringify(initialOurWorkData)),
  blogs: JSON.parse(JSON.stringify(initialBlogsData)),
  careers: JSON.parse(JSON.stringify(initialCareersData)),
  team: JSON.parse(JSON.stringify(initialTeamData)),
  clients: JSON.parse(JSON.stringify(initialClientsData)),
};

export const memoryStore = global.memoryStore;
