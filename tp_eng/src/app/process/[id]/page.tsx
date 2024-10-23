"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Process() {
	const params = useParams();
	const [processInfo, setProcessInfo] = useState<IProcess>({});

	useEffect(() => {
		if (typeof params.id !== 'string') return
		if (!params.id) return

		getProcessInfo(params.id)
	}, [params])

	function getProcessInfo(id: string) {
		axios.get(`${process.env.NEXT_PUBLIC_API_URL}/process/${id}`, {
			headers: {
				"Content-Type": "application/json",
			}
		})
		.then(response => {
			const data: JsonResponse = response.data
			setProcessInfo(data.hits.hits[0]);
			console.log("processo obtido", response.data);
		})
		.catch(error => {
			console.error("Erro ao salvar processo", error);
		});
	}

	return (
		<div>Process</div>
	)
}
