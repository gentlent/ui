// flags: map<int, text>

const flags = {
  // Flag IDs, increment by 1
  RESELLER_TIER: 1,
  PRODUCT_DYNDNS_ENABLED: 2,
  PRODUCT_DYNDNS_LIMIT: 3,
  SUBRESELLERS_ENABLED: 4,
  SUBRESELLERS_ALLOW_MULTILEVEL: 5,
  PRODUCT_DOMAINS_ENABLED: 6,
  PRODUCT_SERVICES_ENABLED: 7,
  PRODUCT_LIR_ENABLED: 8,
};

const definitions = {
  // Reserved, possibly unused
  [flags.RESELLER_TIER]: { type: 'enum', values: ['basic', 'silver', 'gold', 'platinum'], defaultValue: 'basic' },

  // Active use
  [flags.PRODUCT_DOMAINS_ENABLED]: { type: 'bool', defaultValue: true },
  [flags.PRODUCT_DYNDNS_ENABLED]: { type: 'bool', defaultValue: true },
  [flags.PRODUCT_DYNDNS_LIMIT]: { type: 'int', defaultValue: 5 },
  [flags.SUBRESELLERS_ENABLED]: { type: 'bool', defaultValue: false },
  [flags.SUBRESELLERS_ALLOW_MULTILEVEL]: { type: 'bool', defaultValue: false },
  [flags.PRODUCT_SERVICES_ENABLED]: { type: 'bool', defaultValue: false },
  [flags.PRODUCT_LIR_ENABLED]: { type: 'bool', defaultValue: true },
};

function getFlag(id, flagData = {}) {
  const data = flagData || {};
  if (typeof data[id] !== 'undefined') {
    switch (definitions[id].type) {
      case 'bool':
        return !!flagData[id];
      case 'int':
        return parseInt(flagData[id], 10);
      default:
        return flagData[id];
    }
  }

  return definitions[id].defaultValue;
}

module.exports = { flags, getFlag, definitions };
