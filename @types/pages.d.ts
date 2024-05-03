interface ErrorPageProps {
    error: Error;
    reset: () => void;
}

interface DefaultPageProps {
    children: React.ReactNode;
}