type StateComponentProps = {
    state: 'loading' | 'error';
    message?: string;
    className?: string;
    showGoBackButton?: boolean;
    onGoBack?: () => void;
    goBackButtonText?: string;
  };

  export type { StateComponentProps };
