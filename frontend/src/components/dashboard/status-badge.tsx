import type { Status } from "../../types/funcionario"
import { getStatusClasses, getStatusLabel, getStatusIcon } from "../../lib/utils/status"


interface StatusBadgeProps {
  status?: Status | null
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const Icon = getStatusIcon(status)
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 gap-2 text-xs font-medium ${getStatusClasses(status)}`}
    >
      <Icon size='16'/>
      {getStatusLabel(status)}
    </span>
  )
}