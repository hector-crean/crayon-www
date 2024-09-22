'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Book, Calendar, ExternalLink, Search, ShoppingCart, User } from 'lucide-react'
import { useState } from 'react'
import { useQuery } from 'react-query'


interface Publication {
    id: string;
    title: string;
    authors: string[];
    year: number;
}

const fetchPublications = async (query: string): Promise<Publication[]> => {
    const response = await fetch(`/api/publications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ q: query }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};



interface Publication {
    id: string
    title: string
    authors: string[]
    year: number
    abstract: string
}





export function PublicationSearch() {
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('relevance')
    const [basket, setBasket] = useState<Publication[]>([])

    const { data, error, isLoading, refetch } = useQuery<Publication[], Error>(
        ['publications', searchTerm, sortBy],
        () => fetchPublications(searchTerm),
        { enabled: false }
    )

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        refetch()
    }

    const sortedData = data?.sort((a, b) => {
        if (sortBy === 'year') return b.year - a.year
        if (sortBy === 'title') return a.title.localeCompare(b.title)
        return 0 // Default to API's order (assumed to be by relevance)
    })

    const openPubMedArticle = (pubmedId: string) => {
        window.open(`https://pubmed.ncbi.nlm.nih.gov/${pubmedId}`, '_blank');
    };

    const addToBasket = (publication: Publication) => {
        setBasket((prevBasket) => [...prevBasket, publication])
    }

    const removeFromBasket = (publicationId: string) => {
        setBasket((prevBasket) => prevBasket.filter((pub) => pub.id !== publicationId))
    }

    const exportBasket = () => {
        const exportData = basket.map((pub) => ({
            title: pub.title,
            authors: pub.authors.join(', '),
            year: pub.year,
            pubmedId: pub.id,
        }))
        const jsonString = JSON.stringify(exportData, null, 2)
        const blob = new Blob([jsonString], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'exported_publications.json'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Publication Search</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="flex space-x-2">
                        <div className="relative flex-grow">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Enter search term"
                                className="pl-8"
                            />
                        </div>
                        <Button type="submit">Search</Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Publication Basket</CardTitle>
                    <Button onClick={exportBasket} disabled={basket.length === 0}>
                        Export Basket
                    </Button>
                </CardHeader>
                <CardContent>
                    {basket.length === 0 ? (
                        <p className="text-center text-gray-500">Your basket is empty.</p>
                    ) : (
                        <ul className="space-y-2">
                            {basket.map((pub) => (
                                <li key={pub.id} className="flex justify-between items-center">
                                    <span>{pub.title}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeFromBasket(pub.id)}
                                    >
                                        Remove
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>

            {isLoading && (
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {error && (
                <Card>
                    <CardContent className="p-4 text-red-500">
                        Error: {error.message}
                    </CardContent>
                </Card>
            )}

            {sortedData && sortedData.length > 0 && (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Results</CardTitle>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="relevance">Relevance</SelectItem>
                                <SelectItem value="year">Year (Newest first)</SelectItem>
                                <SelectItem value="title">Title (A-Z)</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {sortedData.map((pub) => (
                                <li key={pub.id} className="border p-4 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg flex items-center">
                                                <Book className="mr-2" size={20} />
                                                {pub.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-1 flex items-center">
                                                <User className="mr-2" size={16} />
                                                Authors: {pub.authors.join(', ')}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-1 flex items-center">
                                                <Calendar className="mr-2" size={16} />
                                                Year: {pub.year}
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openPubMedArticle(pub.id)}
                                            className="ml-4"
                                        >
                                            <ExternalLink className="mr-2" size={16} />
                                            View on PubMed
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => addToBasket(pub)}
                                            disabled={basket.some((item) => item.id === pub.id)}
                                        >
                                            <ShoppingCart className="mr-2" size={16} />
                                            {basket.some((item) => item.id === pub.id)
                                                ? 'Added to Basket'
                                                : 'Add to Basket'}
                                        </Button>
                                    </div>
                                    <p className="mt-2 text-sm">{pub.abstract}</p>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}

            {sortedData && sortedData.length === 0 && (
                <Card>
                    <CardContent className="p-4 text-center text-gray-500">
                        No results found. Try a different search term.
                    </CardContent>
                </Card>
            )}
        </div>
    )
}