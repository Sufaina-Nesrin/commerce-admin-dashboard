export default function DashboardCard({ title, value }) {
  return (
    <div className="bg-red-100 rounded-2xl shadow p-6">
      <h3 className="text-gray-500 text-lg">{title}</h3>
      <p className="text-3xl font-bold mt-3">{value}</p>
    </div>
  )
}