declare interface HealthNumberItem {
    title: string;
    unit: string;
    unit2: string;
    paramName: string;
    key: string;
}

declare interface HealthNumberItemRecord {
    value;
    valueTwo;
    textOption: string;
    key;
    createdAt;
}

declare interface ChartData {
	createdAt;
    value: number;
    valueTwo: number;
    textOption: string;
}