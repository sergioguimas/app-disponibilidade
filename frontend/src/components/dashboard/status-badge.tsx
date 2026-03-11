import type { Status } from "../../types/funcionario"
import { getStatusClasses, getStatusLabel } from "../../lib/utils/status"

interface StatusBadgeProps {
  status: Status
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(status)}`}
    >
      {getStatusLabel(status)}
    </span>
  )
}