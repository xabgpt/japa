import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Zap, Target } from 'lucide-react';
import Card from '../ui/Card';

const phaseIcons = [Zap, Target, Clock];
const phaseColors = ['var(--accent)', 'var(--accent-blue)', 'var(--accent-warm)'];

const priorityColors = {
  critical: 'var(--accent-danger)',
  high: 'var(--accent-warm)',
  medium: 'var(--accent)',
};

export default function ActionPlan({ actionPlan, quickWins }) {
  const [checkedItems, setCheckedItems] = useState(new Set());

  const toggleItem = (id) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (!actionPlan?.length) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* Quick Wins */}
      {quickWins?.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-1">Do This Week</h3>
          <p className="text-sm text-[var(--text-secondary)] mb-4">Quick wins to boost your score right away</p>
          <div className="flex flex-col gap-3">
            {quickWins.map((win, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-[var(--accent)]/5 border border-[var(--accent)]/20"
              >
                <Zap className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                <p className="text-sm text-[var(--text-primary)]">{win}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Phased Action Plan */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-6">Your Action Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actionPlan.map((phase, phaseIdx) => {
            const Icon = phaseIcons[phaseIdx] || Clock;
            return (
              <div
                key={phaseIdx}
                className="bg-[var(--surface-2)] rounded-xl p-4 border border-[var(--border)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-5 h-5" style={{ color: phaseColors[phaseIdx] }} />
                  <h4 className="font-semibold text-sm text-[var(--text-primary)]">{phase.title}</h4>
                </div>
                <div className="flex flex-col gap-2">
                  {phase.tasks?.map((task, taskIdx) => {
                    const id = `${phaseIdx}-${taskIdx}`;
                    const isChecked = checkedItems.has(id);
                    return (
                      <motion.div
                        key={taskIdx}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-start gap-2 cursor-pointer group"
                        onClick={() => toggleItem(id)}
                      >
                        {isChecked ? (
                          <CheckCircle2 className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-[var(--text-muted)] mt-0.5 shrink-0 group-hover:text-[var(--accent)]" />
                        )}
                        <div className="flex-1">
                          <p className={`text-sm ${isChecked ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-primary)]'}`}>
                            {task.task}
                          </p>
                          {task.resource_hint && (
                            <p className="text-xs text-[var(--text-muted)] mt-0.5">{task.resource_hint}</p>
                          )}
                        </div>
                        <span
                          className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded"
                          style={{
                            color: priorityColors[task.priority] || 'var(--text-muted)',
                            backgroundColor: `${priorityColors[task.priority] || 'var(--text-muted)'}15`,
                          }}
                        >
                          {task.priority}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
