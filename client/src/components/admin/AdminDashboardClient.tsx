"use client";

import { useState, type FormEvent } from "react";
import { Lock, PlusCircle, RefreshCw } from "lucide-react";
import {
  adminCreatePuppy,
  adminFetchInquiries,
  adminUpdateInquiryStatus,
  adminUpdatePuppyStatus,
  fetchPuppies,
} from "@/lib/api";
import type { InquiryRecord, Puppy } from "@/lib/types";

export function AdminDashboardClient() {
  const [secret, setSecret] = useState("teddypups-admin-2026");
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [puppies, setPuppies] = useState<Puppy[]>([]);

  // Quick Add Puppy form state
  const [title, setTitle] = useState("");
  const [breed, setBreed] = useState("Maltipoo");
  const [gender, setGender] = useState<Puppy["gender"]>("girl");
  const [origin, setOrigin] = useState<Puppy["origin"]>("dubai");
  const [priceAed, setPriceAed] = useState("14500");
  const [creating, setCreating] = useState(false);

  async function loadDashboard(adminKey: string) {
    setError(null);
    setLoading(true);
    try {
      const [inqData, pupData] = await Promise.all([
        adminFetchInquiries(adminKey),
        fetchPuppies(),
      ]);
      setInquiries(inqData);
      setPuppies(pupData);
      setUnlocked(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  }

  async function handleUnlock(e: FormEvent) {
    e.preventDefault();
    await loadDashboard(secret);
  }

  async function handleInquiryStatus(id: string, status: InquiryRecord["status"]) {
    try {
      const updated = await adminUpdateInquiryStatus(id, status, secret);
      setInquiries((prev) => prev.map((inq) => (inq._id === id ? updated : inq)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update inquiry");
    }
  }

  async function handlePuppyStatus(id: string, status: Puppy["status"]) {
    try {
      const updated = await adminUpdatePuppyStatus(id, status, secret);
      setPuppies((prev) => prev.map((p) => (p._id === id ? updated : p)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update puppy");
    }
  }

  async function handleCreatePuppy(e: FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError(null);
    try {
      const slug = `${title}-${Date.now()}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      const created = await adminCreatePuppy(
        {
          name: title,
          slug,
          title,
          breed,
          gender,
          ageMonths: 2,
          ageLabel: "2 months",
          origin,
          status: "available",
          hasVideo: true,
          doorColor: "#C97538",
          defaultDoorOpen: true,
          priceAed: Number(priceAed) || 14500,
          color: "Apricot Cream",
          expectedAdultWeight: "1.8 – 2.5 kg",
          images: ["/images/puppies/maltipoo-cream.svg"],
          description: `Adorable ${breed} puppy curated by TeddyPups U.A.E. with complete vet certification.`,
          personalityTags: ["Vet Checked", "Family Friendly"],
          healthChecks: {
            vaccinated: true,
            dewormed: true,
            vetCertificate: true,
            microchipped: true,
          },
          featuredOnHome: false,
          displayOrder: 50,
        },
        secret
      );
      setPuppies((prev) => [created, ...prev]);
      setTitle("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create puppy");
    } finally {
      setCreating(false);
    }
  }

  if (!unlocked) {
    return (
      <form
        onSubmit={handleUnlock}
        className="max-w-md mx-auto rounded-3xl bg-[#FFF9ED] border-2 border-[#361D10] p-8 space-y-5 shadow-lg"
      >
        <div className="flex items-center gap-3">
          <Lock className="w-6 h-6 text-[#9E4B1D]" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-black text-[#361D10]">
            Admin Console Login
          </h2>
        </div>
        <p className="text-xs text-[#6D5242]">
          Enter your Express `ADMIN_SECRET` key (default local value pre-filled) to
          manage MongoDB puppies and customer inquiries.
        </p>
        {error && (
          <p className="text-xs font-semibold text-[#8F261A] bg-[#FDECEA] p-3 rounded-xl">
            {error}
          </p>
        )}
        <input
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="w-full rounded-xl border border-[#D8C09E] bg-white px-4 py-2.5 text-sm text-[#361D10]"
          placeholder="Admin secret"
          required
        />
        <button type="submit" disabled={loading} className="btn-terracotta w-full text-sm cursor-pointer">
          {loading ? "Connecting..." : "Open Console"}
        </button>
      </form>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-black text-[#361D10]">
          MongoDB Live Manager
        </h2>
        <button
          type="button"
          onClick={() => loadDashboard(secret)}
          className="btn-outline-dark text-xs cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-xl bg-[#FDECEA] border border-[#C84B3B] p-3 text-xs text-[#8F261A]">
          {error}
        </div>
      )}

      {/* Quick Add Puppy */}
      <form
        onSubmit={handleCreatePuppy}
        className="rounded-3xl bg-[#FFF9ED] border-2 border-[#DFC7A3] p-6 space-y-4"
      >
        <h3 className="font-[family-name:var(--font-display)] text-xl font-black text-[#361D10] flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-[#9E4B1D]" />
          Add New Puppy Listing
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Name / Title (e.g. Bella)"
            className="rounded-xl border border-[#D8C09E] bg-white px-3 py-2 text-sm"
          />
          <select
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="rounded-xl border border-[#D8C09E] bg-white px-3 py-2 text-sm"
          >
            <option>Maltipoo</option>
            <option>Pomeranian</option>
            <option>Toy Poodle</option>
            <option>Cavapoo</option>
            <option>Shih Tzu</option>
          </select>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as Puppy["gender"])}
            className="rounded-xl border border-[#D8C09E] bg-white px-3 py-2 text-sm"
          >
            <option value="girl">Girl</option>
            <option value="boy">Boy</option>
          </select>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value as Puppy["origin"])}
            className="rounded-xl border border-[#D8C09E] bg-white px-3 py-2 text-sm"
          >
            <option value="dubai">Dubai Showroom</option>
            <option value="korea">Korea Import</option>
          </select>
          <input
            type="number"
            value={priceAed}
            onChange={(e) => setPriceAed(e.target.value)}
            placeholder="AED Price"
            className="rounded-xl border border-[#D8C09E] bg-white px-3 py-2 text-sm"
          />
        </div>
        <button type="submit" disabled={creating} className="btn-terracotta text-xs cursor-pointer">
          {creating ? "Saving..." : "Create Puppy in MongoDB"}
        </button>
      </form>

      {/* Customer Inquiries Table */}
      <div className="rounded-3xl bg-[#FFF9ED] border-2 border-[#DFC7A3] p-6 space-y-4 overflow-x-auto">
        <h3 className="font-[family-name:var(--font-display)] text-xl font-black text-[#361D10]">
          Customer Inquiries ({inquiries.length})
        </h3>
        {inquiries.length === 0 ? (
          <p className="text-sm text-[#6D5242]">No inquiries submitted yet.</p>
        ) : (
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E5D2B4] text-[#7A5437]">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Contact</th>
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">Message</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq._id} className="border-b border-[#F2E5CF]">
                  <td className="py-3 pr-4 font-bold text-[#361D10]">{inq.fullName}</td>
                  <td className="py-3 pr-4 text-[#5C3D2B]">
                    {inq.whatsappNumber}
                    <br />
                    <span className="text-xs opacity-75">{inq.email}</span>
                  </td>
                  <td className="py-3 pr-4 capitalize">{inq.inquiryType.replace("-", " ")}</td>
                  <td className="py-3 pr-4 max-w-xs truncate">{inq.message}</td>
                  <td className="py-3">
                    <select
                      value={inq.status}
                      onChange={(e) =>
                        handleInquiryStatus(inq._id, e.target.value as InquiryRecord["status"])
                      }
                      className="rounded-lg border border-[#D8C09E] bg-white px-2 py-1 text-xs font-semibold"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Puppy Status List */}
      <div className="rounded-3xl bg-[#FFF9ED] border-2 border-[#DFC7A3] p-6 space-y-4">
        <h3 className="font-[family-name:var(--font-display)] text-xl font-black text-[#361D10]">
          Puppy Listings ({puppies.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {puppies.map((p) => (
            <div
              key={p._id}
              className="rounded-2xl bg-white border border-[#E5D2B4] p-4 flex items-center justify-between gap-3"
            >
              <div>
                <p className="font-bold text-sm text-[#361D10]">{p.title}</p>
                <p className="text-xs text-[#6D5242]">
                  {p.breed} • {p.origin}
                </p>
              </div>
              <select
                value={p.status}
                onChange={(e) =>
                  handlePuppyStatus(p._id, e.target.value as Puppy["status"])
                }
                className="rounded-lg border border-[#D8C09E] bg-[#FAF0DC] px-2.5 py-1 text-xs font-bold text-[#361D10]"
              >
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="gone-home">Gone Home</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

