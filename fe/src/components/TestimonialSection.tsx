"use client";

import { motion } from "framer-motion";
import { Star, User } from "lucide-react";
import { Testimonial } from "@/types";

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialSection({ testimonials }: Props) {
  return (
    <section id="testimoni" className="py-20 bg-[#eaf6f0] scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mb-12"
        >
          <h2 className="text-3xl font-bold text-[#0f1f1a] tracking-tight mb-3">
            Pengalaman Pembeli Nyata
          </h2>
          <p className="text-base text-[#3d5047] leading-relaxed">
            Kepastian serah terima dan kesesuaian kondisi fisik adalah standar yang kami jaga di setiap transaksi.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white p-8 flex flex-col justify-between"
            >
              <div>
                {/* Rating Bintang */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(t.rating || 5)].map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className="w-4 h-4 fill-[#28a870] text-[#28a870]"
                    />
                  ))}
                </div>

                {/* Konten Testimoni */}
                <p className="text-sm text-[#0f1f1a] leading-relaxed mb-8">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              {/* Profil Pembeli dengan Avatar Bulat */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#e2ede7] flex items-center justify-center text-[#28a870] shrink-0">
                  <User className="w-5 h-5 text-[#28a870]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0f1f1a]">{t.buyer_name}</p>
                  <p className="text-xs text-[#28a870] font-semibold">
                    Pembeli Terverifikasi
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
