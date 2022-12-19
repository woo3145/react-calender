import React, {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getLabels, saveLabels } from '../utils/localStorage';

export interface ILabel {
  id: string;
  name: string;
  color: string;
  checked: boolean;
}

interface ContextState {
  labels: ILabel[];
  isAllView: boolean;
}

export const LabelContextState = createContext<ContextState>({
  labels: [],
  isAllView: true,
});

interface ContextDispatch {
  setLabels: Dispatch<React.SetStateAction<ILabel[]>> | null;
  toggleAllView: () => void;
  toggleLabel: (name: string) => void;
}
export const LabelContextDispatch = createContext<ContextDispatch>({
  setLabels: null,
  toggleAllView: () => null,
  toggleLabel: (name: string) => null,
});

export const LabelProvider = ({ children }: { children: ReactNode }) => {
  const [labels, setLabels] = useState<ILabel[]>([]);
  const [isAllView, setIsAllView] = useState(false);

  useEffect(() => {
    setLabels(getLabels());
  }, []);

  useEffect(() => {
    if (labels.length === 0) return;
    let allChecked = true;
    labels.forEach((label) => {
      if (!label.checked) {
        allChecked = false;
      }
    });
    setIsAllView(allChecked);
  }, [labels]);

  // allFilter toggle
  const toggleAllView = useCallback(() => {
    const newLabels = labels.map((label) => {
      label.checked = !isAllView;
      return label;
    });
    setIsAllView(!isAllView);

    setLabels(newLabels);
    saveLabels(newLabels);
  }, [isAllView, labels]);

  // labelFilter toggle
  const toggleLabel = useCallback(
    (name: string) => {
      const newLabels = labels.map((label) => {
        if (label.name === name) {
          label.checked = !label.checked;
        }
        return label;
      });
      setLabels(newLabels);
      saveLabels(newLabels);
    },
    [labels]
  );

  const labelContextStateValue = useMemo(() => {
    return { labels, isAllView };
  }, [labels, isAllView]);

  const labelContextDispatchValue = useMemo(() => {
    return { setLabels, toggleAllView, toggleLabel };
  }, [setLabels, toggleAllView, toggleLabel]);

  return (
    <LabelContextState.Provider value={labelContextStateValue}>
      <LabelContextDispatch.Provider value={labelContextDispatchValue}>
        {children}
      </LabelContextDispatch.Provider>
    </LabelContextState.Provider>
  );
};
