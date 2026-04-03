import mongoose, { Schema } from 'mongoose';

const NewsSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: '' },
    content: { type: String, required: true }, // Rich Text Content
    image: { type: String, required: true }, // URL
    images: [{ type: String }],
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    tags: [{ type: String }],
    author: { type: String, default: 'Admin' },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    views: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.News || mongoose.model('News', NewsSchema);
