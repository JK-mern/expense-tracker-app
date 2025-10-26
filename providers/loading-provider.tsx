import { createContext, PropsWithChildren, useContext, useState } from 'react';

type LoadingContextType = {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
};

const initalValue: LoadingContextType = {
  isLoading: false,
  showLoading: () => {},
  hideLoading: () => {}
};

const LoadingContext = createContext<LoadingContextType>(initalValue);
export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
