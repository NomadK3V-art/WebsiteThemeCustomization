import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div style={{ background: '#05000A', minHeight: '100vh' }}>
      <Outlet />
    </div>
  )
}
