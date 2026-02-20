import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

type FeatureItemProps = {
  icon: string;
  title: string;
  points: string[];
  microHeader?: string;
  ctaLabel?: string;
};

export function FeatureItem({ icon, title, points, microHeader, ctaLabel }: FeatureItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card shadow="none" radius="lg" className="group elite-card h-full hover:-translate-y-0.5 transition-all duration-200 ease-out">
        <CardBody className="p-6 flex flex-col gap-3">
          {microHeader ? (
            <div className="text-[11px] uppercase tracking-[0.08em] text-slate-500">{microHeader}</div>
          ) : null}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-medium bg-primary/20 text-primary border border-primary/35 transition-transform duration-300 group-hover:scale-110">
              <Icon icon={icon} width={20} height={20} />
            </div>
            <h3 className="text-large font-semibold tracking-tight text-slate-900">{title}</h3>
          </div>
          <ul className="mt-1 space-y-2 text-slate-600">
            {points.slice(0, 2).map((p) => (
              <li key={p} className="flex items-start gap-2">
                <Icon icon="lucide:check" width={18} height={18} className="text-success mt-[2px]" />
                <span className="text-small">{p}</span>
              </li>
            ))}
          </ul>
          {ctaLabel ? (
            <button type="button" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              {ctaLabel}
              <Icon icon="lucide:arrow-right" width={16} height={16} />
            </button>
          ) : null}
        </CardBody>
      </Card>
    </motion.div>
  );
}