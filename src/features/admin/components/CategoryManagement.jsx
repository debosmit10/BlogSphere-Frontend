import React, { useState } from "react";
import { PiPlus, PiTrash } from "react-icons/pi";

const CategoryManagement = ({ categories, setCategories }) => {
    const [newCategory, setNewCategory] = useState("");

    const handleAddCategory = () => {
        if (newCategory.trim()) {
            const categoryName = newCategory.toLowerCase().replace(/\s+/g, "_");
            setCategories([
                ...categories,
                {
                    id: Date.now(),
                    name: categoryName,
                    displayName: newCategory.trim(),
                },
            ]);
            setNewCategory("");
        }
    };

    const handleRemoveCategory = (categoryId) => {
        setCategories(categories.filter((cat) => cat.id !== categoryId));
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
                Blog Categories
            </h2>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category name"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
                />
                <button
                    onClick={handleAddCategory}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <PiPlus /> Add
                </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-hidden">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                        <span className="font-medium text-gray-900">
                            {category.displayName}
                        </span>
                        <button
                            onClick={() => handleRemoveCategory(category.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                        >
                            <PiTrash className="text-lg" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryManagement;
