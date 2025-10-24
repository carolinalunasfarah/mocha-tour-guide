type StateComponentProps = {
    state: 'loading' | 'error';
    message?: string;
    className?: string;
    showGoBackButton?: boolean;
    onGoBack?: () => void;
    goBackButtonText?: string;
    showRetryButton?: boolean;
    onRetry?: () => void;
  };

  export type { StateComponentProps };
