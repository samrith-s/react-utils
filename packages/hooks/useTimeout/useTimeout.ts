import { useCallback, useEffect, useRef } from "react";

export type UseTimeoutHandler = () => void;
export type UseTimeoutClearer = () => boolean;

export type UseTimeoutConfig = {
	duration?: number;
};

const DEFAULT_CONFIG: UseTimeoutConfig = {
	duration: 200,
};

export function useTimeout(
	handler: UseTimeoutHandler,
	config: UseTimeoutConfig = DEFAULT_CONFIG
) {
	const timeout = useRef<NodeJS.Timer>(-1 as unknown as NodeJS.Timer);

	const { duration } = config;

	function clearIt() {
		clearTimeout(timeout.current);
	}

	useEffect(() => {
		timeout.current = setTimeout(handler, duration);

		return () => {
			clearIt();
		};
	}, [duration, handler]);

	return useCallback(() => {
		clearIt();
	}, []);
}
