"use client";
/**
 * DAY 2 EXERCISE: Interactive Team Member Cards
 * =============================================
 *
 * GOAL: Add interactivity to the team cards from Day 1 using useState.
 *       Make cards expandable and allow editing team member names.
 *
 * LEARNING OBJECTIVES:
 * - Use useState hook to manage component state
 * - Handle click events (onClick)
 * - Handle input changes (onChange)
 * - Implement controlled inputs
 * - Conditional rendering based on state
 *
 * INSTRUCTIONS:
 * 1. Add expand/collapse functionality to show/hide details
 * 2. Add inline editing for the team member name
 * 3. Track which card is currently being edited
 *
 * START: Copy your Day 1 solution and enhance it with the features below
 */

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
const wcagColors = [
  "#1e40af", // blue-800
  "#166534", // green-800
  "#9f1239", // rose-800
  "#6b21a8", // purple-800
  "#c2410c", // orange-700
  "#0f766e", // teal-700
  "#be185d", // pink-700
  "#4338ca", // indigo-700
];

// Get a consistent color based on name (same name = same color)
function getColorForName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return wcagColors[Math.abs(hash) % wcagColors.length];
}

// ============================================================================
// SAMPLE DATA
// ============================================================================
// const initialTeamMembers = [
//   {
//     id: 1,
//     name: "Sarah Chen",
//     role: "Senior Developer",
//     department: "Engineering",
//     email: "sarah.chen@company.com",
//     avatar: "https://i.pravatar.cc/150?img=1",
//   },
//   {
//     id: 2,
//     name: "Marcus Johnson",
//     role: "QA Engineer",
//     department: "Quality Assurance",
//     email: "marcus.j@company.com",
//     avatar: "https://i.pravatar.cc/150?img=2",
//   },
//   {
//     id: 3,
//     name: "Emily Rodriguez",
//     role: "Tech Lead",
//     department: "Engineering",
//     email: "emily.r@company.com",
//     avatar: "https://i.pravatar.cc/150?img=3",
//   },
//   {
//     id: 4,
//     name: "David Kim",
//     role: "Junior Developer",
//     department: "Engineering",
//     email: "david.kim@company.com",
//     avatar: "https://i.pravatar.cc/150?img=4",
//   },
// ];

const initialTeamMembers = [
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
    avatar: "",
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
// D1: Components
// ============================================================================

// function TeamMember({ name, role, department, email, avatar }) {
//   return (
//     <div className="rounded-lg bg-white p-4 shadow">
//       <Image
//         src={avatar}
//         alt={name}
//         width={96}
//         height={96}
//         className="mb-4 rounded-full"
//       />
//       <h3 className="text-lg font-semibold">{name}</h3>
//       <p>{role}</p>
//       <a href={`mailto:${email}`}>{email}</a>
//       <DepartmentBadge department={department} />
//     </div>
//   );
// }

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

function TeamList({ members, handleCardUpdate }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {members.map((member) => (
        <FancyCard
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

// ============================================================================
// TASK 1: Create an ExpandableCard component
// ============================================================================
// This component should:
// - Show basic info (avatar, name, role) by default
// - Have a button to expand/collapse
// - When expanded, show additional details (department, email)
// - Use useState to track expanded state
//
// HINT:
// const [isExpanded, setIsExpanded] = useState(false);
// ============================================================================

// function ExpandableCard({ name, role, department, email, avatar }) {
//   // TODO: Add state for tracking if card is expanded
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <div
//       style={{
//         border: "1px solid #ddd",
//         borderRadius: "8px",
//         padding: "16px",
//         textAlign: "center",
//       }}
//     >
//       <Image
//         src={avatar}
//         alt={name}
//         width={80}
//         height={80}
//         style={{
//           borderRadius: "50%",
//           objectFit: "cover",
//         }}
//       />
//       <h3>{name}</h3>
//       <p style={{ color: "#666" }}>{role}</p>

//       {/* TODO: Add expand/collapse button */}
//       <button onClick={() => setIsExpanded(!isExpanded)}>
//         {isExpanded ? "Show Less" : "Show More"}
//       </button>

//       {/* TODO: Conditionally render details when expanded */}
//       {isExpanded && (
//         <div>
//           <p>Email: {email}</p>
//           <DepartmentBadge department={department} />
//         </div>
//       )}
//     </div>
//   );
// }

// ============================================================================
// TASK 2: Create an EditableCard component
// ============================================================================
// This component should:
// - Display the team member name normally
// - When clicking an "Edit" button, show an input field instead
// - The input should be a controlled component (value tied to state)
// - Have "Save" and "Cancel" buttons when editing
// - Call onSave prop with the new name when saved
// ============================================================================

function FancyCard({ id, name, role, department, email, avatar, onSave }) {
  // TODO: Add state for editing mode and the edited name
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  // TODO: Create handlers for save and cancel
  const handleSave = () => {
    onSave(id, editedName);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setEditedName(name); // Reset to original
    setIsEditing(false);
  };

  return (
    <div
      onClick={() => setIsSelected(!isSelected)}
      style={{
        backgroundColor: "white",
        border: isSelected ? "2px solid #4f46e5" : "1px solid #ddd",
        borderRadius: "8px",
        padding: isSelected ? "15px" : "16px",
        textAlign: "center",
        boxShadow: isSelected ? "0 4px 12px rgba(79, 70, 229, 0.3)" : "none",
        cursor: "pointer",
      }}
    >
      {imageError ? (
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: getColorForName(name),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 12px auto",
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          {getInitials(name)}
        </div>
      ) : (
        <Image
          src={avatar}
          alt={name}
          width={80}
          height={80}
          onError={() => setImageError(true)}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
            margin: "0 auto 12px auto",
          }}
        />
      )}

      {/* TODO: Conditional rendering - show input when editing, text when not */}
      {isEditing ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              fontSize: "16px",
              width: "150px",
              maxWidth: "100%",
            }}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handleSave}
              style={{
                padding: "8px 16px",
                backgroundColor: "#4f46e5",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              style={{
                padding: "8px 16px",
                backgroundColor: "#e5e7eb",
                color: "#374151",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3>{name}</h3>
          <button
            onClick={() => setIsEditing(true)}
            style={{
              padding: "6px 12px",
              backgroundColor: "#e0e7ff",
              color: "#4f46e5",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "4px",
            }}
          >
            Edit
          </button>
        </div>
      )}

      <p style={{ color: "#666" }}>{role}</p>
      {/* TODO: Add expand/collapse button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          padding: "6px 12px",
          backgroundColor: "#f3f4f6",
          color: "#374151",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: "8px",
        }}
      >
        {isExpanded ? "Show Less" : "Show More"}
      </button>

      {/* TODO: Conditionally render details when expanded */}
      {isExpanded && (
        <div>
          <p style={{ wordBreak: "break-all", fontSize: "14px" }}>
            Email: {email}
          </p>
          <DepartmentBadge department={department} />
        </div>
      )}
    </div>
  );
}

// ============================================================================
// TASK 3: Create the App component with state management
// ============================================================================
// This component should:
// - Store the team members array in state (so we can update it)
// - Pass an onSave handler to update a team member's name
// - Render the list of editable cards
// ============================================================================

function App() {
  // TODO: Add state for team members
  const [members, setMembers] = useState(initialTeamMembers);

  // D1: Sorting logic
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
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "32px" }}>Our Team</h1>
      {/* TODO: Map over members and render EditableCard components */}
      <SortButton
        sortDirection={sort === 0 ? "asc" : "desc"}
        onClick={handleSortClick}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "50px",
        }}
      >
        <TeamList members={sortedMembers} handleCardUpdate={handleCardUpdate} />
      </div>
    </div>
  );
}

// ============================================================================
// STRETCH GOALS (if you finish early)
// ============================================================================
// 1. Add a "Delete" button to remove team members
// 2. Add a form to create new team members
// 3. Add a search/filter input to filter team members by name
// 4. DONE Combine expandable AND editable features in one card
// 5. DONE Add a "selected" state with different styling for selected cards

export default App;
