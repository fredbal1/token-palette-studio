import { TokenStoreProvider } from '@/hooks/useTokenStore';
import { ErrorBoundary } from '@/app/ErrorBoundary';
import { AppShell } from '@/components/layout/AppShell';
import { SectionRouter } from '@/features/token-studio/SectionRouter';

const Index = () => {
  return (
    <ErrorBoundary>
      <TokenStoreProvider>
        <AppShell>
          {(section) => <SectionRouter section={section} />}
        </AppShell>
      </TokenStoreProvider>
    </ErrorBoundary>
  );
};

export default Index;
