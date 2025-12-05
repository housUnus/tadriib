import { Award, BadgeCheck, GraduationCap } from "lucide-react"

const certificates = [
  {
    acronym: "CPA",
    fullForm: "Certified Public Accountant",
    name: "Certified Public Accountant (CPA)",
    subscribers: 1124,
    image: "/professional-accountant-working-with-calculator-pu.jpg",
  },
  {
    acronym: "CMA",
    fullForm: "Certified Management Accountant",
    name: "Certified Management Accountant (CMA)",
    subscribers: 5338,
    image: "/business-finance-documents-gray-professional.jpg",
  },
  {
    acronym: "CIA",
    fullForm: "Certified Internal Auditor",
    name: "Certified Internal Auditor (CIA)",
    subscribers: 3381,
    image: "/auditor-reviewing-documents-teal-corporate.jpg",
  },
  {
    acronym: "PMP",
    fullForm: "Project Management Professional",
    name: "Project Management Professional (PMP)",
    subscribers: 2456,
    image: "/project-manager-team-meeting-green-overlay.jpg",
  },
  {
    acronym: "ACCA",
    fullForm: "Association of Chartered Certified Accountants",
    name: "Chartered Certified Accountants (ACCA)",
    subscribers: 1890,
    image: "/chartered-accountant-office-purple-professional.jpg",
  },
  {
    acronym: "CFA",
    fullForm: "Chartered Financial Analyst",
    name: "Chartered Financial Analyst (CFA)",
    subscribers: 987,
    image: "/financial-analyst-charts-data-teal.jpg",
  },
]

function CertificateCard({ cert }: { cert: (typeof certificates)[0] }) {
  return (
    <div className="group bg-white rounded-xl p-3 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
      <div className="relative h-48 rounded-md overflow-hidden">
        <img
          src={`/images/front-pages/background/certificates/${cert.image}` || "/placeholder.svg"}
          alt={cert.fullForm}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-4xl font-bold text-white drop-shadow-lg">{cert.acronym}</span>
          <p className="text-white/80 text-xs mt-2 leading-snug">{cert.fullForm}</p>
        </div>
      </div>
      <div className="pt-3 pb-1 px-1">
        <h3 className="font-semibold text-slate-800 text-sm leading-tight">{cert.name}</h3>
        <p className="text-slate-500 text-xs mt-1.5">{cert.subscribers.toLocaleString()} Subscribers</p>
      </div>
    </div>
  )
}

export function CertificatesSection() {
  return (
    <>
      <section className="py-10 md:py-14 bg-[#0a2540]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
              Obtain globally recognized <span className="text-[#635bff] italic">professional certificates</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed max-w-3xl mx-auto">
              Our training center has been offering a distinguished range of qualifying courses for local and
              international professional certifications in various fields.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certificates.map((cert, index) => (
              <CertificateCard key={index} cert={cert} />
            ))}
          </div>
        </div>
      </section>

      {/* Purple banner with certificate icons and link */}
      <section className="bg-[#635bff] py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#4f46e5] flex items-center justify-center border-2 border-[#635bff]">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 rounded-full bg-[#7c3aed] flex items-center justify-center border-2 border-[#635bff]">
                <BadgeCheck className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 rounded-full bg-[#8b5cf6] flex items-center justify-center border-2 border-[#635bff]">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-white text-sm md:text-base">
              Explore all our professional certifications and find the right path for your career.
            </p>
            <a
              href="#"
              className="text-white font-medium underline underline-offset-4 hover:text-white/80 transition-colors"
            >
              View all certificates
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default CertificatesSection