import React, {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getLabels, initialLabels, saveLabels } from '../utils/localStorage';

export interface ILabel {
  id: string;
  name: string;
  color: string;
  checked: boolean;
}

interface ContextState {
  labels: ILabel[];
  isAllView: boolean;
  filtering: string[];
}

export const LabelContextState = createContext<ContextState>({
  labels: [],
  isAllView: true,
  filtering: [],
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
  const [filtering, setFiltering] = useState<string[]>([]);

  useEffect(() => {
    try {
      setLabels(getLabels());
    } catch (e) {
      // 로컬스토리지의 값에 오류가 있을 시 초기값으로 초기화
      setLabels(initialLabels());
    }
  }, []);

  useEffect(() => {
    if (labels.length === 0) return;
    let allChecked = true;
    const filteringLabels: string[] = [];
    labels.forEach((label) => {
      if (!label.checked) {
        allChecked = false;
        filteringLabels.push(label.name);
      }
    });
    setFiltering(filteringLabels);
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
    return { labels, isAllView, filtering };
  }, [labels, isAllView, filtering]);

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
