import { useCallback, useEffect, useRef } from "react";

export type UseIntervalHandler = () => void;
export type UseIntervalClearer = () => boolean;

export type UseIntervalConfig = {
	timeout?: number;
	clearer?: UseIntervalClearer;
};

const DEFAULT_CONFIG: UseIntervalConfig = {
	timeout: 200,
};

export function useInterval(
	handler: UseIntervalHandler,
	config: UseIntervalConfig = DEFAULT_CONFIG
) {
	const interval = useRef<NodeJS.Timer>(-1 as unknown as NodeJS.Timer);

	const { timeout, clearer } = config;

	const cleared = useRef(false);

	function clearIt() {
		clearInterval(interval.current);
	}

	useEffect(() => {
		if (!cleared.current) {
			interval.current = setInterval(() => {
				handler();

				if (clearer?.()) {
					cleared.current = true;
					clearIt();
				}
			}, timeout);
		}

		return () => {
			clearIt();
		};
	}, [timeout, clearer, handler]);

	return useCallback(() => {
		clearIt();
	}, []);
}
