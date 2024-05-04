import React from "react";
import initialData from "@/bin/initialData";
import { Navbar } from "@/components/Navbar";
import Kanban from "@/components/Kanban";

export default function Home() {
	return (
		<section className="mix-blend-mode-unset">
			<Kanban kanbanData={initialData} />
		</section>
	);
};
