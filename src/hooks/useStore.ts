import {create} from 'zustand';

interface State {
    ready: boolean;
    isReady: () => void;
}


export const useStore = create((set)=> ({
    ready: false,
    isReady: ()=>set({ready: true}),
}));