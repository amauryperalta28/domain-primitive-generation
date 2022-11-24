using Wepsys.Core;

namespace RI.Novus.Core.Users;

///<summary>Represents User's IntegerIdMax</summary>
public sealed class IntegerIdMax : AbstractPositiveIntegerPrimitive
{
	private static readonly PositiveInteger MinValue = new(1);
	private static readonly PositiveInteger MaxValue = new(40);

	/// <summary>
	/// Creates an instance of <see cref="IntegerIdMax"/>.
	/// <param name="rawValue"></param>
	/// </summary>
	public IntegerIdMax(PositiveInteger rawValue) : base(rawValue, MinValue, MaxValue)
	{
	}

	/// <summary>
	/// Shortcut for constructor <see cref="IntegerIdMax"/>.
	/// <param name="rawIntegerIdMax">Represents a integerIdMax.</param>
	/// <returns>An instance of <see cref="IntegerIdMax"/></returns>
	/// </summary>
	public static IntegerIdMax From(int rawIntegerIdMax) => new(new PositiveInteger(rawIntegerIdMax));

}
