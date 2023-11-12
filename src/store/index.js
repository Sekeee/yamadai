import create from 'zustand';
import { persist } from 'zustand/middleware';
import { createAuthSlice } from './slices/auth';
import { immer } from 'zustand/middleware/immer';
import { createLoadingSlice } from './slices/loading';
import { mergeDeepLeft } from 'ramda';

const useStore = create()(
	persist(
		immer((...a) => {
			return {
				...createAuthSlice(...a),
				...createLoadingSlice(...a),
			};
		}),
		{
			name: 'yamadai-project',
			getStorage: () => localStorage,
			merge: (persistedState, currentState) => mergeDeepLeft(persistedState, currentState),
		}
	)
);

export default useStore;
