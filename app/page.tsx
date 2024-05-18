import React from "react";
import { initialData } from "@/bin/initialData";
import Kanban from "@/components/Kanban";

export default function Home() {
	return (
		<div className="mix-blend-mode-unset">
			<Kanban kanbanData={initialData} />
		</div>
	);
};
