import { useState } from "react";
import { createShop } from "../../api";
import { supabase } from "../supabaseClient";
import "./CreateShop.css";

export default function CreateShop() {

  const categories = ["Food", "Fashion", "Electronics", "Services"];

  const [tagInput, setTagInput] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: []
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addTag = () => {
    if (!tagInput.trim()) return;

    setFormData({
      ...formData,
      tags: [...formData.tags, tagInput.trim()]
    });

    setTagInput("");
  };

  const removeTag = (index) => {
    const newTags = formData.tags.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      tags: newTags
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login first");
        return;
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags: formData.tags,
        owner_id: user.id
      };

      await createShop(payload);

      alert("Shop created!");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="shop-container">
      <div className="shop-card">

        <h2 className="shop-title">Create Shop ✨</h2>

        <input
          className="shop-input"
          name="title"
          placeholder="Shop Title"
          onChange={handleChange}
        />

        <input
          className="shop-input"
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <select
          className="shop-select"
          name="category"
          onChange={handleChange}
        >
          <option value="" disabled>Select Category</option>

          {categories.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* TAG INPUT */}
        <div>
          <input
            className="shop-input"
            value={tagInput}
            placeholder="Add tag"
            onChange={(e) => setTagInput(e.target.value)}
          />

          <button type="button" className="shop-button" onClick={addTag}>
            Add Tag
          </button>
        </div>

        {/* TAGS */}
        <div className="tag-container">
          {formData.tags.map((tag, i) => (
            <div key={i} className="tag" onClick={() => removeTag(i)}>
              {tag} ✕
            </div>
          ))}
        </div>

        <button className="shop-button" onClick={handleSubmit}>
          Create Shop
        </button>

      </div>
    </div>
  );
}
