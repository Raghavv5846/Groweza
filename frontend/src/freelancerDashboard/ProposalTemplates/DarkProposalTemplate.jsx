import React from 'react';

const Section = ({ title, children }) => (
    <div className="break-after-page py-8 px-6">
        <h2 className="text-2xl font-bold border-b border-gray-600 pb-2 mb-4 text-white">{title}</h2>
        <div className="text-gray-300 space-y-2 text-base leading-relaxed">
            {children}
        </div>
    </div>
);

const DarkProposalTemplate = ({ proposal }) => {
    const {
        client,
        freelancer,
        project,
        greeting,
        projectUnderstanding,
        objectives,
        proposedSolutions,
        timeline,
        milestones,
        budget,
        technologies,
        paymentTerms,
        additionalNotes,
        closing,
    } = proposal;

    return (
        <div className="w-[210mm] min-h-[297mm] mx-auto bg-gray-900 text-white p-10 print:p-0 print:w-full print:h-full">
            {/* Page 1: Cover */}
            <div className="h-[297mm] flex flex-col justify-center items-center text-center">
                <h1 className="text-4xl font-bold mb-4 text-white">Project Proposal</h1>
                <h2 className="text-2xl font-semibold text-gray-300">{project?.title}</h2>

                <p className="mt-10 text-lg text-gray-400">Prepared for:</p>
                <p className="font-medium text-xl text-white">{client?.name}</p>
                {client?.email && <p className="text-gray-400">{client.email}</p>}

                <p className="mt-10 text-lg text-gray-400">Prepared by:</p>
                <p className="font-medium text-xl text-white">{freelancer?.name}</p>
                <p className="text-gray-400">{freelancer?.title} | {freelancer?.email}</p>
                {freelancer?.phone && <p className="text-gray-400">{freelancer.phone}</p>}
                {freelancer?.website && <p className="text-gray-400">{freelancer.website}</p>}
            </div>

            {/* Page 2: Greeting & Understanding */}
            <Section title="Greeting">{greeting}</Section>
            <Section title="Project Understanding">{projectUnderstanding}</Section>

            {/* Page 3: Objectives & Proposed Solutions */}
            <Section title="Objectives">{objectives}</Section>
            <Section title="Proposed Solutions">{proposedSolutions}</Section>

            {/* Page 4: Timeline & Milestones */}
            <Section title="Timeline">{timeline}</Section>
            <Section title="Milestones">
                <ul className="list-disc list-inside text-gray-300">
                    {milestones?.map((milestone, index) => (
                        <li key={index}>{milestone}</li>
                    ))}
                </ul>
            </Section>

            {/* Page 5: Budget & Technologies */}
            <Section title="Budget">{budget}</Section>
            <Section title="Technologies">
                <ul className="list-disc list-inside text-gray-300">
                    {technologies?.map((tech, index) => (
                        <li key={index}>{tech}</li>
                    ))}
                </ul>
            </Section>

            {/* Page 6: Payment Terms & Additional Notes */}
            <Section title="Payment Terms">{paymentTerms}</Section>
            <Section title="Additional Notes">{additionalNotes}</Section>

            {/* Page 7: Closing */}
            <Section title="Closing">{closing}</Section>
        </div>
    );
};

export default DarkProposalTemplate;
