import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axiosConfig";
import "./CustomerProfile.css";

function CustomerProfile() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        role: ""
    });

    const [originalProfile, setOriginalProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const userId = localStorage.getItem("userId");

useEffect(() => {
    const loadProfile = async () => {
        if (!userId) {
            setErrorMessage("User ID not found. Please log in again.");
            setLoading(false);
            return;
        }

        try {
            const response = await api.get(`/users/${userId}`);

            setProfile({
                fullName: response.data.fullName || "",
                email: response.data.email || "",
                phone: response.data.phone || "",
                address: response.data.address || "",
                role: response.data.role || ""
            });

        } catch (error) {

            console.log(error);

            console.error(
                "Failed URL:",
                error.config?.baseURL + error.config?.url
            );

            setErrorMessage("User profile not found");

        } finally {
            setLoading(false);
        }
    };

    loadProfile();
}, [userId]);

    const handleEdit = () => {
        setMessage("");
        setErrorMessage("");
        setIsEditing(true);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setProfile((previousProfile) => ({
            ...previousProfile,
            [name]: value
        }));
    };

    const handleCancel = () => {
        if (originalProfile) {
            setProfile({
                ...originalProfile
            });
        }

        setIsEditing(false);
        setMessage("");
        setErrorMessage("");
    };

    const handleSave = async () => {
        if (!profile.fullName.trim()) {
            setErrorMessage(
                "Please enter your full name"
            );

            return;
        }

        if (
            !/^[0-9]{10}$/.test(
                profile.phone.trim()
            )
        ) {
            setErrorMessage(
                "Phone number must contain exactly 10 digits"
            );

            return;
        }

        if (!profile.address.trim()) {
            setErrorMessage(
                "Please enter your address"
            );

            return;
        }

        try {
            setSaving(true);
            setMessage("");
            setErrorMessage("");

            const response = await api.put(
                `/users/${userId}`,
                {
                    fullName:
                        profile.fullName.trim(),

                    phone:
                        profile.phone.trim(),

                    address:
                        profile.address.trim()
                }
            );

            const updatedProfile = {
                fullName:
                    response.data.fullName || "",

                email:
                    response.data.email || "",

                phone:
                    response.data.phone || "",

                address:
                    response.data.address || "",

                role:
                    response.data.role || ""
            };

            setProfile(updatedProfile);

            setOriginalProfile({
                ...updatedProfile
            });

            localStorage.setItem(
                "name",
                updatedProfile.fullName
            );

            localStorage.setItem(
                "phone",
                updatedProfile.phone
            );

            localStorage.setItem(
                "address",
                updatedProfile.address
            );

            setIsEditing(false);

            setMessage(
                "Profile updated successfully"
            );
        } catch (error) {
            console.error(
                "Profile update error:",
                error
            );

            setErrorMessage(
                error.response?.data?.message ||
                "Unable to update profile"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="customer-profile-page">
                <div className="profile-message-card">
                    <h2>Loading profile...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="customer-profile-page">
            <div className="profile-container">

                <div className="profile-header">
                    <div className="profile-avatar">
                        {profile.fullName
                            ? profile.fullName
                                .charAt(0)
                                .toUpperCase()
                            : "C"}
                    </div>

                    <div>
                        <h1>Customer Profile</h1>

                        <p>
                            View and update your
                            personal information
                        </p>
                    </div>
                </div>

                {message && (
                    <div className="profile-success-message">
                        {message}
                    </div>
                )}

                {errorMessage && (
                    <div className="profile-error-message">
                        {errorMessage}
                    </div>
                )}

                <div className="profile-form">

                    <div className="profile-field">
                        <label htmlFor="fullName">
                            Full Name
                        </label>

                        <input
                            id="fullName"
                            type="text"
                            name="fullName"
                            value={profile.fullName}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="profile-field">
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={profile.email}
                            disabled
                        />
                    </div>

                    <div className="profile-field">
                        <label htmlFor="phone">
                            Phone Number
                        </label>

                        <input
                            id="phone"
                            type="text"
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            maxLength={10}
                        />
                    </div>

                    <div className="profile-field">
                        <label htmlFor="role">
                            Role
                        </label>

                        <input
                            id="role"
                            type="text"
                            value={profile.role}
                            disabled
                        />
                    </div>

                    <div className="profile-field profile-address-field">
                        <label htmlFor="address">
                            Address
                        </label>

                        <textarea
                            id="address"
                            name="address"
                            value={profile.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                            rows={4}
                        />
                    </div>

                </div>

                <div className="profile-actions">

                    {!isEditing ? (
                        <button
    type="button"
    onClick={() => {
        alert("Edit button clicked");
        setIsEditing(true);
    }}
    style={{
        position: "relative",
        zIndex: 99999,
        pointerEvents: "auto",
        padding: "12px 25px",
        backgroundColor: "blue",
        color: "white",
        border: "none",
        cursor: "pointer"
    }}
>
    Edit Profile
</button>
                    ) : (
                        <>
                            <button
                                type="button"
                                className="profile-save-button"
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>

                            <button
                                type="button"
                                className="profile-cancel-button"
                                onClick={handleCancel}
                                disabled={saving}
                            >
                                Cancel
                            </button>
                        </>
                    )}

                </div>

            </div>
        </div>
    );
}

export default CustomerProfile;