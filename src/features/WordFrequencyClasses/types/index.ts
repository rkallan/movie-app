interface InterfaceWordFrequency {
    getWord: () => string;
    getFrequency: () => number;
}

interface InterfaceWordFrequencyAnalyzer {
    calculateHighestFrequency(): number;
    calculateFrequencyForWord(): number;
    calculateMostFrequentNWords(): InterfaceWordFrequency[];
}

export type { InterfaceWordFrequency, InterfaceWordFrequencyAnalyzer };
