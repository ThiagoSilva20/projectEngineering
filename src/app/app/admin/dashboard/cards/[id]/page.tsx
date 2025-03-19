import { getProjetosById } from "@/app/app/actions/actions"

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const projects = (await params).id
    const project = await getProjetosById(projects)
    return (
        <div>
            <h1>Project Page</h1>
            <p>{project?.titulo}</p>
        </div>
    )
}