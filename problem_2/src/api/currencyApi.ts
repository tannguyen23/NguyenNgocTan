import axiosClient from "./axiosClient";

export interface CurrencyData {
	currency: string;
	date: string;
	price: number;
}

const currencyApi = {
	getAll: async (): Promise<CurrencyData[]> => {
		try {
			const response = await axiosClient.get<CurrencyData[]>("/prices.json");

			return filterLatestCurrencies(response.data);
		} catch (error) {
			console.error("Error fetching currency data:", error);
			throw error;
		}
	},
};

const filterLatestCurrencies = (data: CurrencyData[]): CurrencyData[] => {
	// Sử dụng Map để lưu trữ currency với date mới nhất
	const latestCurrencyMap = new Map<string, CurrencyData>();

	data.forEach((item) => {
		const existing = latestCurrencyMap.get(item.currency);

		// Nếu chưa có hoặc date mới hơn, cập nhật Map
		if (!existing || new Date(item.date) > new Date(existing.date)) {
			latestCurrencyMap.set(item.currency, item);
		}
	});

	// Trả về danh sách các giá trị từ Map
	return Array.from(latestCurrencyMap.values());
};

export default currencyApi;
