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

// Department badge colors (specific colors for each department)
const departmentColors = {
  Engineering: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  "Quality Assurance":
    "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  Infrastructure:
    "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
};

function getDeptBadgeClasses(department) {
  return (
    departmentColors[department] ||
    "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
  );
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

function TeamMember({
  id,
  name,
  role,
  department,
  email,
  avatar,
  onSave,
  onDelete,
}) {
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

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    // TODO: Replace style={{...}} with className="..."
    <div
      className={`${isSelected ? "border-2 border-indigo-500 shadow-lg" : "border border-gray-200 dark:border-gray-700"} bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-200`}
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
            className="py-2 px-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handleSave}
              className="py-2 px-4 bg-indigo-600 text-white rounded-sm cursor-pointer hover:bg-indigo-700 transition-all duration-200"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="py-2 px-4 bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded-sm cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            {name}
          </h3>
          <button
            onClick={() => setIsEditing(true)}
            className="py-2 px-4 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-sm cursor-pointer mt-1 rounded-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
          >
            Edit
          </button>
        </div>
      )}
      {/* TODO: Style the department badge - colored background, small text */}
      <span
        className={`${getDeptBadgeClasses(department)} px-3 py-1 rounded-full text-sm inline-block my-2 transition-all duration-200`}
      >
        {department}
      </span>
      <div>
        {/* TODO: Add expand/collapse button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="py-2 px-4 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-sm cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>

        {/* TODO: Conditionally render details when expanded */}
        {isExpanded && (
          <div>
            {/* TODO: Style the role - medium gray color */}
            <p className="text-gray-600 dark:text-gray-400 mt-1">{role}</p>
            {/* TODO: Style the email - smaller text, lighter color */}
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-3">
              {email}
            </p>
            <button
              onClick={handleDelete}
              className="py-2 px-4 mt-2 bg-red-500 text-red-50 rounded-sm cursor-pointer hover:bg-red-600 transition-all duration-200"
            >
              🗑️ Remove from Team
            </button>
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

function TeamList({ members, handleCardUpdate, onDelete }) {
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
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

function SortButton({ sortDirection, onClick }) {
  return (
    <div className="mb-6 flex items-center space-x-2 dark:text-gray-200">
      <button className="text-md" onClick={onClick}>
        {sortDirection === "asc" ? "↑" : "↓"}
      </button>
      <p>Sort By Department</p>
    </div>
  );
}

function AddMemberForm({ onAdd, onCancel }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("Engineering");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !role.trim() || !email.trim()) return;

    onAdd({
      id: Date.now(),
      name: name.trim(),
      role: role.trim(),
      department,
      email: email.trim(),
      avatar: "",
    });

    // Reset form
    setName("");
    setRole("");
    setDepartment("Engineering");
    setEmail("");
  };

  const inputClasses =
    "w-full py-2 px-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-6 border border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Add New Team Member
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Role
          </label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Job title"
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Department
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className={inputClasses}
          >
            <option value="Engineering">Engineering</option>
            <option value="Quality Assurance">Quality Assurance</option>
            <option value="Infrastructure">Infrastructure</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@company.com"
            className={inputClasses}
            required
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="py-2 px-4 bg-indigo-600 text-white rounded-sm cursor-pointer hover:bg-indigo-700 transition-all duration-200"
        >
          Add Member
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="py-2 px-4 bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded-sm cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
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
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);

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

  const handleDelete = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const handleAddMember = (newMember) => {
    setMembers([...members, newMember]);
    setShowAddForm(false);
  };

  // Filter members based on search
  const filteredMembers = sortedMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    // TODO: Replace with Tailwind classes
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Our Team
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Meet the amazing people behind our success
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <SortButton
            sortDirection={sort === 0 ? "asc" : "desc"}
            onClick={handleSortClick}
          />

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {members.length} Members
            </span>

            <input
              type="text"
              placeholder="Search by name or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-3 px-4 text-base rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white w-full max-w-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
            />

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="py-3 px-4 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition-all duration-200 whitespace-nowrap"
            >
              {showAddForm ? "Cancel" : "+ Add Member"}
            </button>
          </div>
        </div>

        {showAddForm && (
          <AddMemberForm
            onAdd={handleAddMember}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        <TeamList
          members={filteredMembers}
          handleCardUpdate={handleCardUpdate}
          onDelete={handleDelete}
        />

        {filteredMembers.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
            No team members found matching &apos;{searchTerm}&apos;
          </p>
        )}

        <div className="text-center mt-12 text-gray-400 dark:text-gray-500 text-sm">
          Built with React + Tailwind CSS
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// STRETCH GOALS (if you finish early)
// ============================================================================
//// 1. Add hover effects to cards (hover:shadow-lg, hover:scale-105)
//// 2. Add a gradient background to the page
//// 3. Add dark mode support (dark:bg-gray-800, etc.)
//// 4. Add smooth transitions (transition-all duration-200)
//// 5. Style the department badges with different colors per department

export default App;
