/**
 * DAY 3 EXERCISE: Restyle Team Cards with Tailwind CSS
 * ====================================================
 *
 * GOAL: Replace inline styles with Tailwind utility classes.
 *       Make the layout responsive and polished.
 *
 * LEARNING OBJECTIVES:
 * - Apply Tailwind utility classes for spacing, colors, typography
 * - Build responsive layouts with breakpoint prefixes
 * - Use flexbox and grid utilities
 * - Understand the utility-first approach
 *
 * INSTRUCTIONS:
 * 1. Remove all inline styles
 * 2. Replace with Tailwind classes
 * 3. Make the grid responsive (1 col mobile, 2 cols tablet, 3 cols desktop)
 *
 * TAILWIND CHEAT SHEET:
 *
 * Spacing:
 *   p-4 (padding: 1rem)     m-4 (margin: 1rem)
 *   px-4 (padding x-axis)   my-4 (margin y-axis)
 *   gap-4 (grid/flex gap)
 *
 * Colors:
 *   bg-white, bg-gray-100, bg-blue-500
 *   text-gray-900, text-gray-600, text-white
 *
 * Typography:
 *   text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl
 *   font-normal, font-medium, font-semibold, font-bold
 *
 * Layout:
 *   flex, flex-col, items-center, justify-between
 *   grid, grid-cols-1, md:grid-cols-2, lg:grid-cols-3
 *
 * Borders & Shadows:
 *   border, border-gray-200, rounded-lg, rounded-full
 *   shadow-sm, shadow-md, shadow-lg
 *
 * Responsive Prefixes:
 *   sm: (640px+)  md: (768px+)  lg: (1024px+)  xl: (1280px+)
 */

"use client";
import Image from "next/image";

const teamMembers = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior Developer",
    department: "Engineering",
    email: "sarah.chen@company.com",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "QA Engineer",
    department: "Quality Assurance",
    email: "marcus.j@company.com",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Tech Lead",
    department: "Engineering",
    email: "emily.r@company.com",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Junior Developer",
    department: "Engineering",
    email: "david.kim@company.com",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Architect",
    department: "Engineering",
    email: "lisa.t@company.com",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "James Wilson",
    role: "DevOps Engineer",
    department: "Infrastructure",
    email: "james.w@company.com",
    avatar: "https://i.pravatar.cc/150?img=6",
  },
];

// ============================================================================
// TASK 1: Convert TeamMember component to use Tailwind
// ============================================================================
// Replace all inline styles with Tailwind classes
//
// BEFORE (inline style):
//   style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}
//
// AFTER (Tailwind):
//   className="border border-gray-200 rounded-lg p-4"
// ============================================================================

function TeamMember({ name, role, department, email, avatar }) {
  return (
    // TODO: Replace style={{...}} with className="..."
    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow duration-200">
      {/* TODO: Style the avatar - make it rounded, with proper sizing */}
      <Image
        src={avatar}
        alt={name}
        width={96}
        height={96}
        className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-gray-100"
      />

      {/* TODO: Style the name - larger text, bold, dark color */}
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{name}</h3>

      {/* TODO: Style the role - medium gray color */}
      <p className="text-gray-600 mt-1">{role}</p>

      {/* TODO: Style the department badge - colored background, small text */}
      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm inline-block my-2">
        {department}
      </span>

      {/* TODO: Style the email - smaller text, lighter color */}
      <p className="text-gray-400 text-sm mt-3">{email}</p>
    </div>
  );
}

// ============================================================================
// TASK 2: Convert TeamList component to use Tailwind Grid
// ============================================================================
// Make it responsive:
// - 1 column on mobile (default)
// - 2 columns on medium screens (md:)
// - 3 columns on large screens (lg:)
//
// HINT: className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
// ============================================================================

function TeamList({ members }) {
  return (
    // TODO: Replace with Tailwind grid classes
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {members.map((member) => (
        <TeamMember
          key={member.id}
          name={member.name}
          role={member.role}
          department={member.department}
          email={member.email}
          avatar={member.avatar}
        />
      ))}
    </div>
  );
}

// ============================================================================
// TASK 3: Convert App component to use Tailwind
// ============================================================================
// Style the container and heading with Tailwind
//
// Container hints:
//   max-w-6xl mx-auto px-4 py-8
//
// Heading hints:
//   text-3xl font-bold text-center text-gray-900 mb-8
// ============================================================================

function App() {
  return (
    // TODO: Replace with Tailwind classes
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Our Team</h1>

          <p className="text-gray-600 text-lg">
            Meet the amazing people behind our success
          </p>

          <div className="mt-4 flex justify-center gap-2">
            <span className="inline-flex items-center gap-1 text-sm text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {teamMembers.length} Members
            </span>
          </div>
        </div>

        <TeamList members={teamMembers} />

        <div className="text-center mt-12 text-gray-400 text-sm">
          Built with React + Tailwind CSS
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// STRETCH GOALS (if you finish early)
// ============================================================================
// 1. Add hover effects to cards (hover:shadow-lg, hover:scale-105)
// 2. Add a gradient background to the page
// 3. Add dark mode support (dark:bg-gray-800, etc.)
// 4. Add smooth transitions (transition-all duration-200)
// 5. Style the department badges with different colors per department

export default App;
