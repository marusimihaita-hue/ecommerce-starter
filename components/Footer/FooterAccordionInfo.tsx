import { locations } from "@/lib/data/footerData";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";

export function FooterAccordion() {
  return (
    <div className="w-full bg-white py-16 px-4 mt-12">
      <div className="max-w-xl mx-auto">
        {/* Tittle */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3 ">
            Suport Clienti CompactValdav
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Mai jos gasesti toate metodele noastre de contact si locatiile
            fizice
          </p>
        </div>

        {/* Grey Container */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <Accordion type="single" collapsible className="space-y-3">
            {locations.map((loc, idx) => (
              <AccordionItem
                key={idx}
                value={loc.name}
                className="bg-gray-50 rounded-lg px-5"
              >
                <AccordionTrigger className="py-4 text-left text-[15px] font-medium te text-gray-800 hover:no-underline ">
                  {loc.name}
                </AccordionTrigger>

                <AccordionContent className="pb-6 pt-2 text-sm text-gray-700">
                  <div className="space-y-5">
                    {/* Adress */}
                    <div>
                      <h3 className="font-semibold mb-1">Adresa</h3>
                      <p className="text-gray-600">{loc.address}</p>
                    </div>

                    {/* Program */}
                    <div>
                      <h3 className="font-semibold mb-1">Ore de functionare</h3>
                      <ul className="space-y-1">
                        {loc.schedule.map((s, i) => (
                          <li key={i}>
                            <span className="font-medium">{s.days}:</span>{" "}
                            <span className="text-gray-600">{s.hours}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Phone */}
                    <div>
                      <h3 className="font-semibold mb-1">Telefon</h3>
                      <p className="text-gray-600">{loc.phone}</p>
                      <p className="text-gray-500 text-xs">
                        Program telefonic: {loc.phoneHours}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
