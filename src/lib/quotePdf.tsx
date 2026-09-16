import { Document, Page, Text, View, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import { business } from "@/lib/business";

const GREEN = "#23731a";
const GREEN_DARK = "#133f0e";
const AMBER = "#f59e0b";
const TEXT_DARK = "#111827";
const TEXT_MUTED = "#6b7280";
const BORDER = "#e5e7eb";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: TEXT_DARK,
  },
  headerBar: {
    backgroundColor: GREEN_DARK,
    marginHorizontal: -40,
    marginTop: -40,
    paddingHorizontal: 40,
    paddingVertical: 24,
    marginBottom: 28,
  },
  brand: { color: "#ffffff", fontSize: 18, fontFamily: "Helvetica-Bold" },
  tagline: { color: AMBER, fontSize: 10, marginTop: 4 },
  title: { fontSize: 16, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  subtitle: { fontSize: 10, color: TEXT_MUTED, marginBottom: 20 },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    paddingVertical: 8,
  },
  label: {
    width: 110,
    color: GREEN,
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: { flex: 1, fontSize: 11 },
  messageBox: {
    marginTop: 20,
    padding: 14,
    backgroundColor: "#f8faf8",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 4,
  },
  messageLabel: {
    color: GREEN,
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  messageText: { fontSize: 11, lineHeight: 1.5 },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 8,
    color: TEXT_MUTED,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 10,
    lineHeight: 1.5,
  },
});

export type QuotePdfFields = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt: Date;
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

function QuotePdfDocument({ name, email, phone, service, message, createdAt }: QuotePdfFields) {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(createdAt);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBar}>
          <Text style={styles.brand}>{business.name}</Text>
          <Text style={styles.tagline}>{business.tagline}</Text>
        </View>

        <Text style={styles.title}>New Quote Request</Text>
        <Text style={styles.subtitle}>Submitted {formattedDate}</Text>

        <Field label="Name" value={name} />
        <Field label="Email" value={email} />
        <Field label="Phone" value={phone} />
        <Field label="Service" value={service} />

        <View style={styles.messageBox}>
          <Text style={styles.messageLabel}>Message</Text>
          <Text style={styles.messageText}>{message || "(no message provided)"}</Text>
        </View>

        <Text style={styles.footer}>
          {business.name} {"·"} {business.addressLine}
          {"\n"}
          {business.phoneDisplay} {"·"} {business.email}
        </Text>
      </Page>
    </Document>
  );
}

export async function generateQuotePdf(fields: QuotePdfFields): Promise<Buffer> {
  return renderToBuffer(<QuotePdfDocument {...fields} />);
}
