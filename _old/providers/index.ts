interface Providers {
  techniques: TechProvider[];

  storage: Provider;
}

interface Provider {
    frontend: ProviderFrontend;
    backend: ProviderBackend;
}

interface TechProvider extends Provider {
  isTech: true;
}

const Providers: Providers = {
  techniques: [TechProviderVXOrganic],
  storage: ProviderDevStorage,
};

export const 

// API
// POST [provider]/[method]
