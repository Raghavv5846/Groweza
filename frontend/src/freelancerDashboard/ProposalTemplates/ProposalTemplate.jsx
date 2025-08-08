import React from 'react';

const Section = ({ title, children }) => (
    <div className="break-after-page py-8 px-6">
        <h2 className="text-2xl font-bold border-b pb-2 mb-4 text-gray-800">{title}</h2>
        <div className="text-gray-700 space-y-2 text-base leading-relaxed">
            {children}
        </div>
    </div>
);

const MultiPageProposalTemplate = ({ proposal }) => {
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
        <div className="w-[210mm] min-h-[297mm] mx-auto bg-white text-black p-10 print:p-0 print:w-full print:h-full">
            {/* Page 1: Cover */}
            <div className="h-[297mm] flex flex-col justify-center items-center text-center">
                <h1 className="text-4xl font-bold mb-4">Project Proposal</h1>
                <h2 className="text-2xl font-semibold text-gray-700">{project.title}</h2>
                <p className="mt-10 text-lg">Prepared for:</p>
                <p className="font-medium text-xl">{client.name}</p>
                <p className="text-gray-600">{client.email}</p>

                <p className="mt-10 text-lg">Prepared by:</p>
                <p className="font-medium text-xl">{freelancer.name}</p>
                <p className="text-gray-600">{freelancer.title} | {freelancer.email}</p>
                <p className="text-gray-600">{freelancer.phone}</p>
                <p className="text-gray-600">{freelancer.website}</p>
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
                <ul className="list-disc list-inside">
                    {milestones?.map((milestone, index) => (
                        <li key={index}>{milestone}</li>
                    ))}
                </ul>
            </Section>

            {/* Page 5: Budget & Technologies */}
            <Section title="Budget">{budget}</Section>
            <Section title="Technologies">
                <ul className="list-disc list-inside">
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

export default MultiPageProposalTemplate;
