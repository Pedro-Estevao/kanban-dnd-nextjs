interface InitialDataColumnProps {
    id: string;
    title: string;
    columnColor: string;
    cards: {
        id: string;
        title: string;
        categories: string[];
    }[];
};

interface InitialDataLastIdProps {
    column: string;
    card: string;
};

interface InitialDataProps {
    columns: InitialDataColumnProps[];
    lastId: InitialDataLastIdProps;
};

interface CategiriesColorsCardProps {
    id: string;
    title: string;
    nameColor: string;
    color: string;
};