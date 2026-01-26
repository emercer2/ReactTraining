"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * DAY 1 EXERCISE: Static Team Member Card Grid
 * ============================================
 *
 * GOAL: Build a static team member card grid using React components and props.
 *       No interactivity needed yet - just display data.
 *
 * LEARNING OBJECTIVES:
 * - Create functional components
 * - Pass data via props
 * - Render lists with .map()
 * - Use the key prop correctly
 *
 * INSTRUCTIONS:
 * 1. Complete the TeamMember component to display a single team member
 * 2. Complete the TeamList component to render all team members
 * 3. Complete the App component to tie everything together
 *
 * SAMPLE DATA: Use the teamMembers array provided below
 */

// ============================================================================
// SAMPLE DATA - Use this for your exercise
// ============================================================================
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
// TASK 1: Create the TeamMember component
// ============================================================================
// This component should display a single team member card
//
// Props it should accept:
// - name (string)
// - role (string)
// - department (string)
// - email (string)
// - avatar (string - URL)
//
// What to display:
// - Avatar image
// - Name (as a heading)
// - Role
// - Department
// - Email
// ============================================================================

function TeamMember({ name, role, department, email, avatar }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <Image
        src={avatar}
        alt={name}
        width={96}
        height={96}
        className="mb-4 rounded-full"
      />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p>{role}</p>
      <a href={`mailto:${email}`}>{email}</a>
      <DepartmentBadge department={department} />
    </div>
  );
}

function DepartmentBadge({ department }) {
  return (
    <div>
      <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
        {department}
      </span>
    </div>
  );
}

function SortButton({ sortDirection, onClick }) {
  return (
    <div className="mb-6 flex items-center space-x-2">
      <button className="text-md" onClick={onClick}>
        {sortDirection === "asc" ? "↑" : "↓"}
      </button>
      <p>Sort By Department</p>
    </div>
  );
}

// ============================================================================
// TASK 2: Create the TeamList component
// ============================================================================
// This component should render a list of TeamMember components
//
// Props it should accept:
// - members (array of team member objects)
//
// Requirements:
// - Use .map() to iterate over the members array
// - Pass the correct props to each TeamMember
// - Don't forget the key prop!
// ============================================================================

function TeamList({ members }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
// TASK 3: Create the App component
// ============================================================================
// This is the main component that brings everything together
//
// Requirements:
// - Display a page title (e.g., "Our Team")
// - Render the TeamList component with the teamMembers data
// ============================================================================

function App() {
  const [sort, setSort] = useState(0);

  function handleSortClick() {
    setSort((prevSort) => (prevSort === 0 ? 1 : 0));
  }

  const sortedMembers = [...teamMembers].sort((a, b) => {
    const comparison = a.department.localeCompare(b.department);
    return sort === 0 ? comparison : -comparison;
  });

  return (
    <div className="w-full max-w-6xl p-4">
      <h1 className="mb-6 text-2xl font-bold">Our Team</h1>
      <SortButton sortDirection={sort === 0 ? "asc" : "desc"} onClick={handleSortClick} />
      <TeamList members={sortedMembers} />
    </div>
  );
}

// ============================================================================
// STRETCH GOALS (if you finish early)
// ============================================================================
// 1. Add a TeamHeader component that shows the total count of team members
// 2. Create a DepartmentBadge component to highlight the department
// 3. Add an "avatar fallback" - show initials if avatar fails to load
// 4. Group team members by department

export default App;
