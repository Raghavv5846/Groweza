import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
} from '@react-pdf/renderer';

Font.register({
    family: 'Helvetica-Bold',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/helveticaneue/v11/O4ZRFGnJvIpX8Y1sCxrUacMQ.woff2' },
    ],
});

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 12,
        fontFamily: 'Helvetica',
        backgroundColor: '#ffffff',
        color: '#000000',
    },
    section: {
        marginBottom: 20,
        borderBottom: '1 solid #d1d5db',
        paddingBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#111827',
    },
    text: {
        fontSize: 12,
        color: '#374151',
    },
    listItem: {
        marginLeft: 12,
        marginBottom: 4,
    },
    center: {
        textAlign: 'center',
        marginTop: 200,
    },
});

const Section = ({ title, children }) => (
    <View style={styles.section}>
        <Text style={styles.title}>{title}</Text>
        {Array.isArray(children)
            ? children.map((item, i) => <Text key={i} style={styles.text}>{item}</Text>)
            : <Text style={styles.text}>{children}</Text>}
    </View>
);

const LightDownloadableProposalPDF = ({ proposal }) => {
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
        <Document>
            {/* Cover Page */}
            <Page size="A4" style={styles.page}>
                <View style={styles.center}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
                        Project Proposal
                    </Text>
                    <Text style={{ fontSize: 18, marginBottom: 20 }}>{project?.title}</Text>

                    <Text style={styles.text}>Prepared for:</Text>
                    <Text style={styles.text}>{client?.name}</Text>
                    <Text style={styles.text}>{client?.email}</Text>

                    <Text style={[styles.text, { marginTop: 30 }]}>Prepared by:</Text>
                    <Text style={styles.text}>{freelancer?.name}</Text>
                    <Text style={styles.text}>{freelancer?.title} | {freelancer?.email}</Text>
                    {freelancer?.phone && <Text style={styles.text}>{freelancer.phone}</Text>}
                    {freelancer?.website && <Text style={styles.text}>{freelancer.website}</Text>}
                </View>
            </Page>

            {/* Proposal Pages */}
            <Page size="A4" style={styles.page}>
                <Section title="Greeting">{greeting}</Section>
                <Section title="Project Understanding">{projectUnderstanding}</Section>
                <Section title="Objectives">{objectives}</Section>
                <Section title="Proposed Solutions">{proposedSolutions}</Section>
                <Section title="Timeline">{timeline}</Section>
                <Section title="Milestones">
                    {milestones?.map((milestone, i) => (
                        <Text key={i} style={styles.listItem}>• {milestone}</Text>
                    ))}
                </Section>
                <Section title="Budget">{budget}</Section>
                <Section title="Technologies">
                    {technologies?.map((tech, i) => (
                        <Text key={i} style={styles.listItem}>• {tech}</Text>
                    ))}
                </Section>
                <Section title="Payment Terms">{paymentTerms}</Section>
                <Section title="Additional Notes">{additionalNotes}</Section>
                <Section title="Closing">{closing}</Section>
            </Page>
        </Document>
    );
};

export default LightDownloadableProposalPDF;
