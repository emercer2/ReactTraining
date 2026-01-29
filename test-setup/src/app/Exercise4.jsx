/**
 * DAY 4 EXERCISE: Add Task Management to Your Project
 * ===================================================
 * 
 * BUILDING ON DAY 3: You've built styled team cards with Tailwind.
 * Now we'll add a task management feature to the same project.
 * 
 * GOAL: Add a TaskForm and TaskList section below your team cards.
 *       Apply Tailwind state variants (hover, focus, disabled).
 * 
 * WHAT YOU'LL ADD:
 * - TaskForm component (input + button with states)
 * - TaskItem component (with completion toggle)
 * - TaskList component (renders TaskItems)
 * - A new "Tasks" section in your App
 * 
 * DO NOT START A NEW PROJECT - Add to your Day 3 code!
 */

"use client";
import { useState } from 'react';
import Image from "next/image";

// ============================================================================
// KEEP YOUR DAY 3 CODE!
// Your existing components: TeamMember, TeamList, and teamMembers data
// should remain in your file. We're ADDING to it, not replacing it.
// ============================================================================

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
  const [imageError, setImageError] = useState(!avatar);
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
      className={`${isSelected ? "border-2 border-indigo-500 shadow-lg" : "border border-gray-200 dark:border-gray-700"} bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden`}
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
        <div className="flex flex-col items-center gap-2 w-full">
          <Input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="text-center max-w-full mt-3"
          />
          <div className="flex gap-2">
            <Button onClick={handleSave} variant="primary" size="sm" className="mt-1">
              Save
            </Button>
            <Button onClick={handleCancel} variant="secondary" size="sm" className="mt-1">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            {name}
          </h3>
          <Button onClick={() => setIsEditing(true)} variant="secondary" size="sm" className="mt-1">
            Edit
          </Button>
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
        <Button onClick={() => setIsExpanded(!isExpanded)} variant="secondary" size="sm" className="mt-1">
          {isExpanded ? "Show Less" : "Show More"}
        </Button>

        {/* TODO: Conditionally render details when expanded */}
        {isExpanded && (
          <div>
            {/* TODO: Style the role - medium gray color */}
            <p className="text-gray-600 dark:text-gray-400 mt-1">{role}</p>
            {/* TODO: Style the email - smaller text, lighter color */}
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-3">
              {email}
            </p>
            <Button onClick={handleDelete} variant="danger" size="sm" className="mt-1">
              🗑️ Remove from Team
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}


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

  const selectClasses = "w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 border-gray-200";

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
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Role
          </label>
          <Input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Job title"
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
            className={selectClasses}
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
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@company.com"
            required
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button type="submit" variant="primary">
          Add Member
        </Button>
        <Button onClick={onCancel} variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
}

// ============================================================================
// TASK 1: Create a reusable Button component
// ============================================================================
// You'll use this for the task form and throughout the app.
// 
// Requirements:
// - Accept variant prop: 'primary' | 'secondary' | 'danger'
// - Apply hover states (hover:bg-blue-600)
// - Apply focus states (focus:ring-2 focus:ring-blue-500)
// - Apply disabled states (disabled:opacity-50 disabled:cursor-not-allowed)
// - Smooth transitions (transition-all duration-200)
// ============================================================================

function Button({ children, onClick, disabled = false, variant = 'primary', type = 'button', size = 'md', className = '' }) {
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
    blue: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-4 py-3',
  };

  const baseClasses = "rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

// ============================================================================
// TASK 2: Create a reusable Input component
// ============================================================================
// 
// Requirements:
// - Clean border with rounded corners
// - Focus: blue ring, smooth transition
// - Error state: red border (when error prop is true)
// - Disabled state: gray background
// ============================================================================

function Input({ value, onChange, placeholder, error = false, disabled = false, type = 'text', className = '', required = false }) {
  const baseClasses = "w-full px-4 py-3 border-2 rounded-lg placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder:text-gray-400";
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-600';

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      className={`${baseClasses} ${errorClasses} ${className}`}
    />
  );
}

// ============================================================================
// TASK 3: Create TaskForm component
// ============================================================================
// 
// Props: onAddTask (function called with new task title)
// 
// Requirements:
// - Input for task title
// - Submit button (disabled when input is empty)
// - Clear input after successful submission
// - Show error if trying to submit empty
// ============================================================================

const priorityDotColors = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500',
};

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [error, setError] = useState('');
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Please enter a task');
      return;
    }

    onAddTask(title.trim(), priority);
    setTitle('');
    setPriority('medium');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            placeholder="Add a new task..."
            error={!!error}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
            className="flex items-center gap-2 px-3 py-3 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-200"
          >
            <span className={`w-4 h-4 rounded-full ${priorityDotColors[priority]}`} />
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showPriorityDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-10 py-1">
              <button
                type="button"
                onClick={() => { setPriority('low'); setShowPriorityDropdown(false); }}
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 transition-all duration-200"
              >
                <span className="w-4 h-4 rounded-full bg-green-500" />
                <span className="text-sm text-gray-700">Low</span>
              </button>
              <button
                type="button"
                onClick={() => { setPriority('medium'); setShowPriorityDropdown(false); }}
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 transition-all duration-200"
              >
                <span className="w-4 h-4 rounded-full bg-yellow-500" />
                <span className="text-sm text-gray-700">Medium</span>
              </button>
              <button
                type="button"
                onClick={() => { setPriority('high'); setShowPriorityDropdown(false); }}
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 transition-all duration-200"
              >
                <span className="w-4 h-4 rounded-full bg-red-500" />
                <span className="text-sm text-gray-700">High</span>
              </button>
            </div>
          )}
        </div>
        <Button type="submit" disabled={!title.trim()}>
          Add Task
        </Button>
      </div>
    </form>
  );
}

// ============================================================================
// TASK 4: Create TaskItem component
// ============================================================================
// 
// Props: task, onToggle, onDelete
// 
// Requirements:
// - Checkbox to toggle completion (styled, not default)
// - Task title with strikethrough when completed
// - Delete button (appears on hover)
// - Hover effect on the entire item
// ============================================================================

function TaskItem({ task, onToggle, onDelete }) {
  const liClasses = task.completed
    ? "group flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 bg-gray-50 border-gray-100"
    : "group flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 bg-white border-gray-200 hover:border-blue-200 hover:shadow-md";

  const checkboxClasses = task.completed
    ? "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 bg-green-500 border-green-500 text-white"
    : "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 border-gray-300 hover:border-green-400";

  const titleClasses = task.completed
    ? "transition-all duration-200 line-through text-gray-400"
    : "transition-all duration-200 text-gray-800";

  const priorityDot = task.priority ? priorityDotColors[task.priority] : null;

  return (
    <li className={liClasses}>
      <div className="flex items-center gap-3">
        {/* Custom Checkbox */}
        <button onClick={() => onToggle(task.id)} className={checkboxClasses}>
          {task.completed && (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Task Title */}
        <span className={titleClasses}>{task.title}</span>

        {/* Priority Dot */}
        {priorityDot && (
          <span className={`inline-block w-3 h-3 rounded-full shrink-0 ${priorityDot}`} title={task.priority} />
        )}
      </div>

      {/* Delete Button - visible on hover */}
      <button
        onClick={() => onDelete(task.id)}
        className="p-2 text-gray-400 opacity-0 group-hover:opacity-100
          hover:text-red-500 hover:bg-red-50 rounded-lg
          transition-all duration-200"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </li>
  );
}

// ============================================================================
// TASK 5: Create TaskList component
// ============================================================================

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-400 py-8">
        No tasks yet. Add one above!
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

// ============================================================================
// TASK 6: Create TaskSection component
// ============================================================================
// This wraps the form and list together with a header

function TaskSection({ tasks, onAddTask, onToggle, onDelete, onClearCompleted }) {
  const remainingCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <section className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {remainingCount} remaining
        </span>
      </div>

      <TaskForm onAddTask={onAddTask} />
      <TaskList tasks={tasks} onToggle={onToggle} onDelete={onDelete} />

      {completedCount > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Button onClick={onClearCompleted} variant="secondary" size="sm">
            Clear {completedCount} completed
          </Button>
        </div>
      )}
    </section>
  );
}

// ============================================================================
// TASK 7: Update your App component
// ============================================================================
// Add task state and handlers, then render TaskSection below your TeamList
// 
// Your App should now have:
// - Team Members section (from Day 3)
// - Tasks section (new)
// ============================================================================

// Sample tasks to start with
const initialTasks = [
  { id: 1, title: 'Review team member profiles', priority: 'low', completed: true },
  { id: 2, title: 'Update project documentation', priority: 'medium', completed: false },
  { id: 3, title: 'Schedule team standup', priority: 'high', completed: false },
];

function App() {
  // Keep your existing teamMembers data from Day 3!
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


  // Add task state
  const [tasks, setTasks] = useState(initialTasks);

  // Task handlers
  const addTask = (title, priority = 'medium') => {
    setTasks([...tasks, { id: Date.now(), title, priority, completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Team Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your team and track tasks
          </p>
        </div>

        {/* Two-column layout on large screens */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Team Section - Takes 2 columns */}
          <div className="lg:col-span-2">
            <section className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
                <span className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {members.length} Members
                </span>
              </div>

                <div className="flex justify-between items-center mb-6">
                <SortButton
                    sortDirection={sort === 0 ? "asc" : "desc"}
                    onClick={handleSortClick}
                />

                <div className="flex items-center gap-4">
                    <Input
                      placeholder="Search by name or role..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-100"
                    />

                    <Button
                      onClick={() => setShowAddForm(!showAddForm)}
                      variant="primary"
                      size="lg"
                      className="whitespace-nowrap"
                    >
                      {showAddForm ? "Cancel" : "+ Add Member"}
                    </Button>
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
            </section>
          </div>

          {/* Tasks Section - Takes 1 column */}
          <div className="lg:col-span-1">
            <TaskSection
              tasks={tasks}
              onAddTask={addTask}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onClearCompleted={clearCompleted}
            />
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-12">
          Built with React + Tailwind CSS
        </p>
      </div>
    </div>
  );
}

export default App;

// ============================================================================
// CHECKLIST: Before moving to Day 5
// ============================================================================
/*
[x] Button component works with all three variants
[x] Input component shows error state correctly
[x] Can add new tasks
[x] Can toggle task completion (checkbox + strikethrough)
[x] Can delete tasks (button appears on hover)
[x] Tasks section appears alongside team section
[x] All hover/focus states work smoothly

STRETCH GOALS:
[x] Add task priority (high/medium/low) with color coding
[x] Add "Clear completed" button
[x] Add task count to page title
[x] Add keyboard shortcut (Enter to submit)
*/
