export const initialData: InitialDataProps = {
    columns: [
        {
            id: "0",
            title: "Backlog",
            columnColor: "bg-danger",
            cards: [
                {
                    id: "8",
                    title: "Dashboard layout design",
                    categories: ["0", "6", "14"],
                },
                {
                    id: "9",
                    title: "Account profile flow diagrams",
                    categories: ["5", "6", "8"],
                },
                {
                    id: "10",
                    title: "Review admin console designs",
                    categories: ["0", "6", "14"],
                },
                {
                    id: "11",
                    title: "Slide templates for client pitch project",
                    categories: ["6", "7", "14"],
                },
                {
                    id: "12",
                    title: "Research and strategy for upcoming projects",
                    categories: ["5", "11", "12"],
                },
                {
                    id: "13",
                    title: "Company website redesign",
                    categories: ["6", "14"],
                },
                {
                    id: "14",
                    title: "Mobile app login process prototype",
                    categories: ["6", "11", "12"],
                }
            ]
        },
        {
            id: "1",
            title: "In Progress",
            columnColor: "bg-warning",
            cards: [
                {
                    id: "6",
                    title: "Shopping cart and product catalog wireframes",
                    categories: ["6", "11", "12"],
                },
                {
                    id: "7",
                    title: "Social media posts",
                    categories: ["6", "7", "14"],
                }
            ]
        },
        {
            id: "2",
            title: "Review",
            columnColor: "bg-primary",
            cards: [
                {
                    id: "3",
                    title: "Navigation designs",
                    categories: ["6", "14"],
                },
                {
                    id: "4",
                    title: "Review client spec document and give feedback",
                    categories: ["5", "6", "8"],
                },
                {
                    id: "5",
                    title: "End user flow charts",
                    categories: ["5", "6", "8"],
                }
            ]
        },
        {
            id: "3",
            title: "Complete",
            columnColor: "bg-success",
            cards: [
                {
                    id: "1",
                    title: "Create style guide based on previus feedback",
                    categories: ["6", "14"],
                },
                {
                    id: "2",
                    title: "User profile prototypes",
                    categories: ["6", "11", "12"],
                },
            ],
        },
    ],
    lastId: {
        column: "3",
        card: "14",
    },
};

export const categoriesCard: CategiriesColorsCardProps[] = [
    {
        id: "0",
        title: "Feature",
        nameColor: "Slate",
        color: "bg-slate-500",
    },
    {
        id: "1",
        title: "Bug",
        nameColor: "Gray",
        color: "bg-gray-500",
    },
    {
        id: "2",
        title: "Improvement",
        nameColor: "Stone",
        color: "bg-stone-500",
    },
    {
        id: "3",
        title: "Technical Debt",
        nameColor: "Red",
        color: "bg-red-500",
    },
    {
        id: "4",
        title: "Documentation",
        nameColor: "Orange",
        color: "bg-orange-500",
    },
    {
        id: "5",
        title: "Research",
        nameColor: "Yellow",
        color: "bg-yellow-500",
    },
    {
        id: "6",
        title: "UI/UX Design",
        nameColor: "Lime",
        color: "bg-lime-500",
    },
    {
        id: "7",
        title: "Graphic Design",
        nameColor: "Green",
        color: "bg-green-500",
    },
    {
        id: "8",
        title: "Interation Design",
        nameColor: "Teal",
        color: "bg-teal-500",
    },
    {
        id: "9",
        title: "Marketing",
        nameColor: "Cyan",
        color: "bg-cyan-500",
    },
    {
        id: "10",
        title: "Accessibility",
        nameColor: "Sky",
        color: "bg-sky-500",
    },
    {
        id: "11",
        title: "Prototyping",
        nameColor: "Violet",
        color: "bg-violet-500",
    },
    {
        id: "12",
        title: "Usability Testing",
        nameColor: "Fuchsia",
        color: "bg-fuchsia-500",
    },
    {
        id: "13",
        title: "Responsive Design",
        nameColor: "Rose",
        color: "bg-rose-500",
    },
    {
        id: "14",
        title: "Branding",
        nameColor: "Amber",
        color: "bg-amber-500",
    }
];