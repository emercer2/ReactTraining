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
import { useState } from "react";

// Helper function to get initials from a name
function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// WCAG AA compliant colors (4.5:1 contrast ratio with white text)
const wcagBgColors = [
  "bg-blue-800",
  "bg-green-800",
  "bg-rose-800",
  "bg-purple-800",
  "bg-orange-700",
  "bg-teal-700",
  "bg-pink-700",
  "bg-indigo-700",
];

// Get a consistent bg color class based on name (same name = same color)
function getBgColorClass(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return wcagBgColors[Math.abs(hash) % wcagBgColors.length];
}

const teamMembers = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior Developer",
    department: "Engineering",
    email: "sarah.chen@company.com",
    avatar: "",
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

function TeamMember({ id, name, role, department, email, avatar, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleSave = () => {
    onSave(id, editedName);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setEditedName(name); // Reset to original
    setIsEditing(false);
  };

  return (
    // TODO: Replace style={{...}} with className="..."
    <div
      className={`${isSelected ? "border-2 border-indigo-500 shadow-lg" : "border border-gray-200"} bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow duration-200`}
      onClick={() => setIsSelected(!isSelected)}
    >
      {/* TODO: Style the avatar - make it rounded, with proper sizing */}
      {imageError ? (
        <div
          className={`${getBgColorClass(name)} mt-0 mb-4 text-4xl font-bold text-white flex items-center justify-center w-24 h-24 rounded-full mx-auto ring-4 ring-gray-100`}
        >
          {getInitials(name)}
        </div>
      ) : (
        <Image
          src={avatar}
          alt={name}
          width={96}
          height={96}
          onError={() => setImageError(true)}
          className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-gray-100"
        />
      )}
      {/* TODO: Style the name - larger text, bold, dark color */}
      {isEditing ? (
        <div className="flex flex-col items-center gap-2">
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="py-2 px-4 border border-gray-300 rounded-sm"
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handleSave}
              className="py-2 px-4 bg-indigo-600 text-white rounded-sm cursor-pointer"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="py-2 px-4 bg-gray-200 rounded-sm cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">{name}</h3>
          <button
            onClick={() => setIsEditing(true)}
            className="py-2 px-4 bg-gray-200 text-sm cursor-pointer mt-1 rounded-sm"
          >
            Edit
          </button>
        </div>
      )}
      {/* TODO: Style the department badge - colored background, small text */}
      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm inline-block my-2">
        {department}
      </span>
      <div>
        {/* TODO: Add expand/collapse button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="py-2 px-4 bg-gray-200 rounded-sm cursor-pointer"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>

        {/* TODO: Conditionally render details when expanded */}
        {isExpanded && (
          <div>
            {/* TODO: Style the role - medium gray color */}
            <p className="text-gray-600 mt-1">{role}</p>
            {/* TODO: Style the email - smaller text, lighter color */}
            <p className="text-gray-400 text-sm mt-3">{email}</p>
          </div>
        )}
      </div>
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

function TeamList({ members, handleCardUpdate }) {
  return (
    // TODO: Replace with Tailwind grid classes
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {members.map((member) => (
        <TeamMember
          key={member.id}
          id={member.id}
          name={member.name}
          role={member.role}
          department={member.department}
          email={member.email}
          avatar={member.avatar}
          onSave={handleCardUpdate}
        />
      ))}
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
  // TODO: Add state for team members
  const [members, setMembers] = useState(teamMembers);
  const [sort, setSort] = useState(0);

  function handleSortClick() {
    setSort((prevSort) => (prevSort === 0 ? 1 : 0));
  }

  const sortedMembers = [...members].sort((a, b) => {
    const comparison = a.department.localeCompare(b.department);
    return sort === 0 ? comparison : -comparison;
  });

  // TODO: Create handler to update a member's name
  const handleCardUpdate = (id, newName) => {
    setMembers(
      members.map((member) =>
        member.id === id ? { ...member, name: newName } : member,
      ),
    );
  };

  return (
    // TODO: Replace with Tailwind classes
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Our Team</h1>

          <p className="text-gray-600 text-lg">
            Meet the amazing people behind our success
          </p>
          <SortButton
            sortDirection={sort === 0 ? "asc" : "desc"}
            onClick={handleSortClick}
          />
          <div className="mt-4 flex justify-center gap-2">
            <span className="inline-flex items-center gap-1 text-sm text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {teamMembers.length} Members
            </span>
          </div>
        </div>

        <TeamList members={sortedMembers} handleCardUpdate={handleCardUpdate} />

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
